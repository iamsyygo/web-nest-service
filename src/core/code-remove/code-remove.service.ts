import { Injectable } from '@nestjs/common';
import { CreateCodeRemoveDto } from './dto/create-code-remove.dto';
import { UpdateCodeRemoveDto } from './dto/update-code-remove.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeRemove } from '../index.entity';
import { Repository, getRepository } from 'typeorm';
import { PaginateOptions, paginate } from 'src/utils/paginate';
import { PaginateDto } from './dto/paginate.dto';

@Injectable()
export class CodeRemoveService {
  constructor(
    @InjectRepository(CodeRemove)
    private repository: Repository<CodeRemove>,
  ) {}

  getList(query: PaginateDto) {
    return paginate(this.repository, query);
  }

  async setCodeRemove(createCodeRemoveDto: CreateCodeRemoveDto) {
    const reslut = await this.repository.save(createCodeRemoveDto);
    return reslut;
  }

  async deleteCodeRemove(ids: string[]) {
    const reslut = await this.repository.delete(ids);
    return reslut;
  }
}
