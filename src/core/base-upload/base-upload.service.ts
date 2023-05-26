import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileBase } from './entities/file.entity';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import { promisify } from 'util';
import { paginate } from 'src/utils/paginate';
import { PaginateImageDto } from './dto/image.dto';
import { async } from 'rxjs';

@Injectable()
export class BaseUploadService {
  @InjectRepository(FileBase)
  private readonly fileRepository: Repository<FileBase>;
  async uploadImage(file: Express.Multer.File) {
    return await this.createFileBase(file);
  }

  async uploadImages(files: Express.Multer.File[]) {
    const entities = files.map((file) => {
      const newFilename = file.filename.split('/').slice(-1)[0];
      return plainToClass(FileBase, {
        filePath: file.path,
        fileSize: file.size,
        fileType: file.mimetype,
        newFilename: newFilename,

        realFilename: file.originalname,
      });
    });
    return await this.fileRepository.save(entities);
  }

  async readImage(id: string) {
    const image = await this.fileRepository.findOne({
      where: { id },
    });
    if (!image) {
      throw new HttpException('图片不存在', 400);
    }
    // 使用 fs 模块读取图片
    const root = image.filePath;

    // 使用 node 内置 readFile 转 promise
    const readFile = promisify(fs.readFile);

    return readFile(root)
      .then((data) => {
        return {
          file: data,
          data: image,
        };
      })
      .catch((err) => {
        throw new HttpException(err, 400);
      });
  }

  async getImageList(query: PaginateImageDto) {
    return await paginate<FileBase>(this.fileRepository, {
      page: query.page,
      limit: query.limit,
      timeRanges: {
        createTime: query.createTime,
      },
    });
  }

  async baseUpload(file: Express.Multer.File) {
    return await this.createFileBase(file);
  }
  async downloadBase(id: string) {
    return await this.readFiles([id]);
  }

  async createFileBase(file: Express.Multer.File) {
    const newFilename = file.filename.split('/').slice(-1)[0];
    const entity = plainToClass(FileBase, {
      filePath: file.path,
      fileSize: file.size,
      fileType: file.mimetype,
      newFilename: newFilename,
      realFilename: file.originalname,
    });
    return await this.fileRepository.save(entity);
  }

  async readFiles(ids: string[]) {
    const images = await this.fileRepository.findByIds(ids);
    if (!images) {
      throw new HttpException('图片不存在', 400);
    }
    // 使用 fs 模块读取图片
    const roots = images.map((image) => image.filePath);

    // 使用 node 内置 readFile 转 promise
    const readFile = promisify(fs.readFile);

    return Promise.all(
      roots.map((item) => {
        return readFile(item);
      }),
    )
      .then((data) => {
        return {
          file: data,
          data: images,
        };
      })
      .catch((err) => {
        throw new HttpException(err, 400);
      });
  }
}
