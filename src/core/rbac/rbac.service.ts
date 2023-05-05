import { Injectable } from '@nestjs/common';
import { CreateRbacUserDto } from './dto/create-rbac.dto';
import { UpdateRbacDto } from './dto/update-rbac.dto';
import { RbacUser } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RbacRole } from './entities/role.entity';
import { paginate } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { PaginateRoleDto, PaginateUserDto } from './dto/paginate.dto';

@Injectable()
export class RbacService {
  @InjectRepository(RbacUser)
  private readonly userRepository: Repository<RbacUser>;

  @InjectRepository(RbacRole)
  private readonly roleRepository: Repository<RbacRole>;
  async findUserList(query: PaginateUserDto) {
    query.eager = ['roles'];
    return paginate(this.userRepository, query);
  }
  async findRoleList(query: PaginateRoleDto) {
    query.eager = ['users'];
    return paginate(this.roleRepository, query);
  }

  async createUser(createRbacDto: CreateRbacUserDto) {
    const reslut = await this.userRepository.save(createRbacDto);
    return reslut;
  }
}
