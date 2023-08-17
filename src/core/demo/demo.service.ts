import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';
import { Repository } from 'typeorm';
import { findPage } from '../_base/base.curd';
import { BaseQueryDto } from '../_base/dto/query.base.dto';
import { QueryDemoDto } from './dto/query-demo.dto';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private readonly demoRepository: Repository<Demo>,
  ) {}

  create(createDemoDto: CreateDemoDto) {
    return this.demoRepository.save(createDemoDto);
  }

  findAll(dto: QueryDemoDto) {
    return findPage(this.demoRepository, {
      page: dto.page,
      pageSize: dto.pageSize,
      condition: {
        order: dto.sort?.split(',') as any,
        likes: {
          name: dto.name,
        },
        dateRanges: {
          createTime: dto.createTime?.split(','),
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
