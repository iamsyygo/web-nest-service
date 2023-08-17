import { Injectable } from '@nestjs/common';
import { DictCategory } from './entities/dict-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDictCategory } from './dto/query-dict-category.dto';
import { paginate } from 'src/utils/paginate';
import { CreateDictCategoryDto } from './dto/create-dict-category.dto';
import { plainToClass } from 'class-transformer';
import { SystemDict } from './entities/system-dict.entity';
import { CreateSystemDictDto } from './dto/create-system-dict.dto';
import { QuerySystemDict } from './dto/query-system-dict.dto';
import { async } from 'rxjs';

@Injectable()
export class SystemDictService {
  constructor(
    @InjectRepository(DictCategory)
    private categoryRepository: Repository<DictCategory>,
    @InjectRepository(SystemDict)
    private dictRepository: Repository<SystemDict>,
  ) {}
  getDictCategoryTree() {
    // return this.repository.find();
    // 查10条数据
    return this.categoryRepository.find({
      take: 10,
      relations: ['children'],
      where: {
        level: 1,
        parentId: null,
      },
    });
  }

  async queryDictList(query: QueryDictCategory) {
    const { page = 1, limit = 10, createTime, ...otherParams } = query;

    return await paginate<DictCategory>(this.categoryRepository, {
      page,
      limit,
      dates: {
        createTime,
      },
      fuzzy: otherParams,
    });
  }

  async createDictCategory(dto: CreateDictCategoryDto) {
    const entity = plainToClass(DictCategory, dto);
    return await this.categoryRepository.save(entity);
  }

  async createDict(dto: CreateSystemDictDto) {
    const entity = plainToClass(SystemDict, dto);
    return await this.dictRepository.save(entity);
  }

  async getDictList(query: QuerySystemDict) {
    const { page = 1, limit = 10, createTime, type, ...otherParams } = query;
    const types = await this.recursionGetCorrelationFields(type, 'code');
    if (!types.length) return { data: [], total: 0 };
    return await paginate<SystemDict>(this.dictRepository, {
      page,
      limit,
      dates: {
        createTime,
      },
      // fuzzy: otherParams,
      // exact: { type },
      multiple: { type: types },
    });
  }

  // 递归获取子分类的某个字段
  async recursionGetCorrelationFields(type: string, field: string) {
    const datas = await this.categoryRepository.find({
      where: {
        code: type,
      },
      relations: ['children'],
    });

    if (!datas.length) {
      return [];
    }
    const fields = this.handleRecursionFields(datas, field);

    return fields;
  }

  handleRecursionFields(items: any[], field: string) {
    const fields: string[] = [];
    for (const item of items) {
      fields.push(item[field]);
      if (item.children?.length) {
        const childrens = this.handleRecursionFields(item.children, field);
        fields.push(...childrens);
      }
    }
    return fields;
  }
}
