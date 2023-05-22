import { HttpException, Injectable } from '@nestjs/common';
import { CreateRbacUserDto } from './dto/create-rbac.dto';
import { RbacUser } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RbacRole } from './entities/role.entity';
import { paginate } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { PaginateRoleDto, PaginateUserDto } from './dto/paginate.dto';
import { plainToClass } from 'class-transformer';
import { AuthUser, TokenData, WxinDto } from './dto/user.dto';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { getYmlByKey } from 'src/config';

@Injectable()
export class RbacService {
  private readonly wxinConfig = getYmlByKey('wxin');
  constructor(private jwtService: JwtService) {}
  @InjectRepository(RbacUser)
  private readonly userRepository: Repository<RbacUser>;

  @InjectRepository(RbacRole)
  private readonly roleRepository: Repository<RbacRole>;
  async findUserList(query: PaginateUserDto) {
    query.eager = ['roles'];

    return paginate(this.userRepository, {
      ...query,
      select: [
        'q.id',
        'q.username',
        'q.address',
        'q.avatar',
        'q.birthday',
        'q.city',
        'q.email',
        'q.fullName',
        'q.gender',
        'q.phoneNumber',
        'q.registerTime',
      ],
    });
  }
  async findRoleList(query: PaginateRoleDto) {
    query.eager = ['users'];
    return paginate(this.roleRepository, query);
  }

  async createUser(createRbacDto: CreateRbacUserDto) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber: createRbacDto.phoneNumber, email: createRbacDto.email },
    });
    if (user) {
      throw new HttpException('用户已存在', 400);
    }
    // 触发 TypeORM 的生命周期
    const entity = plainToClass(RbacUser, createRbacDto);
    // entity.registerIp = req
    const reslut = await this.userRepository.save(entity);

    return reslut;
  }

  // 认证用户 - PC
  async authUser(body: AuthUser) {
    const user = await this.validateUser({ email: body.email, phoneNumber: body.phoneNumber });
    if (!compareSync(body.password, user.password)) {
      throw new HttpException('密码错误', 400);
    }
    const token = this.createToken({
      sub: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    return `Bearer ${token}`;
  }

  // https://api.weixin.qq.com/sns/jscode2session
  // 小程序登录
  async wxinLogin(body: WxinDto) {
    let _user: RbacUser;
    // 请求微信接口获取用户信息
    const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: this.wxinConfig.appId,
        secret: this.wxinConfig.appSecret,
        js_code: body.code,
        grant_type: 'authorization_code',
      },
    });

    // TODO: 可以通过 openid 查询用户是否存在

    // console.log(wxRes);
    if (wxRes.status !== 200) {
      throw new HttpException(wxRes.data.errmsg, 400);
    }
    if (body.id) {
      // 更新用户信息
      console.log('更新用户信息');
      let user = await this.validateUser({ id: body.id });
      user = user || new RbacUser();
      user.openid = wxRes.data.openid;
      user.sessionKey = wxRes.data.session_key;
      user.username = body.username;
      user.avatar = body.avatar;

      const entities = plainToClass(RbacUser, user);
      _user = await this.userRepository.save(entities);
    } else {
      // 创建用户
      // const user = new RbacUser();
      // Object.assign(user, {
      //   username: body.username,
      //   avatar: body.avatar,
      //   openid: wxRes.data.openid,
      // });
      const entities = plainToClass(RbacUser, {
        ...new RbacUser(),
        username: body.username,
        avatar: body.avatar,
        openid: wxRes.data.openid,
        sessionKey: wxRes.data.session_key,
      });
      // await this.userRepository.save(entities);
      _user = await this.userRepository.save(entities);
    }

    const token = this.createToken({
      sub: _user.id,
      username: _user.username,
      openid: _user.openid,
      sessionKey: _user.sessionKey,
    });

    delete _user.password;
    delete _user.openid;
    delete _user.sessionKey;

    return {
      accessToken: `Bearer ${token}`,
      user: _user,
    };
  }

  // 创建 token
  private createToken(user: TokenData) {
    return this.jwtService.sign(user);
  }

  // 验证 用户
  private async validateUser(w: any) {
    const user = await this.userRepository.findOne({
      where: w,
    });
    if (!user) {
      throw new HttpException('用户不存在', 400);
    }
    return user;
  }
}
