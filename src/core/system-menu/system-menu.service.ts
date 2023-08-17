import { HttpException, Injectable } from '@nestjs/common';
import { CreateSystemMenuDto } from './dto/create-system-menu.dto';
import { UpdateSystemMenuDto } from './dto/update-system-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { SystemMenu } from './entities/system-menu.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SystemMenuService {
  constructor(
    @InjectRepository(SystemMenu)
    private menuRepository: Repository<SystemMenu>,
  ) {}
  createMenu(createSystemMenuDto: CreateSystemMenuDto) {
    const entities = plainToClass(SystemMenu, createSystemMenuDto);
    return this.menuRepository.save(entities);
  }

  findAll() {
    // 获取所有菜单, 并按照层级关系进行排序
    // return this.menuRepository.find({
    //   where: {
    //     // 过滤掉parentId为空的数据
    //     parentId: Not(IsNull()),
    //   },
    //   order: { id: 'ASC' },
    //   relations: ['children'],
    // });
    return this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.parentId IS NULL')
      .orderBy('menu.id', 'ASC')
      .leftJoinAndSelect('menu.children', 'children')
      .getMany();
  }

  async findAllSimpleTree() {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu');
    // 获取parentId不为空的数据，返回一个 path[]
    const paths = await queryBuilder
      .where('menu.parentId IS NOT NULL')
      .select(['menu.id', 'menu.name', 'menu.path', 'menu.icon', 'menu.level'])
      .getRawMany();

    const menus = paths.reduce((acc, item) => {
      acc[item.menu_path] = item;
      return acc;
    }, {});

    const res = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.status = 1 AND menu.parentId IS NULL')
      .orderBy('menu.level', 'ASC')
      .select(['menu.id', 'menu.name', 'menu.path', 'menu.icon', 'menu.level'])
      .leftJoinAndSelect('menu.children', 'children', 'children.status = 1')
      .getMany();

    return {
      paths: menus,
      menus: res,
    };
  }

  async update(updateSystemMenuDto: UpdateSystemMenuDto) {
    const result = await this.menuRepository.update(updateSystemMenuDto.id, updateSystemMenuDto);
    const isScuccess = result.affected > 0;
    if (!isScuccess) {
      throw new HttpException('更新失败', 400);
    }
    return result;
  }

  async remove(id: any) {
    const result = await this.menuRepository.delete(id);
    if (result.affected > 0) return '删除成功';
    throw new HttpException('删除失败', 400);
  }
}
