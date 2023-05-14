import { HttpException, Injectable } from '@nestjs/common';
import { CreateRbacUserDto } from './dto/create-rbac.dto';
import { UpdateRbacDto } from './dto/update-rbac.dto';
import { RbacUser } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RbacRole } from './entities/role.entity';
import { paginate } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { PaginateRoleDto, PaginateUserDto } from './dto/paginate.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RbacService {
  @InjectRepository(RbacUser)
  private readonly userRepository: Repository<RbacUser>;

  @InjectRepository(RbacRole)
  private readonly roleRepository: Repository<RbacRole>;
  async findUserList(query: PaginateUserDto) {
    query.eager = ['roles'];
    return paginate(this.userRepository, { ...query, select: ['q.id', 'q.address'] });
  }
  async findRoleList(query: PaginateRoleDto) {
    query.eager = ['users'];
    return paginate(this.roleRepository, query);
  }

  async createUser(createRbacDto: CreateRbacUserDto, req: Request) {
    // 触发 TypeORM 的生命周期
    const entity = plainToClass(RbacUser, createRbacDto);
    // entity.registerIp = req
    const reslut = await this.userRepository.save(entity);

    return reslut;
  }
}
