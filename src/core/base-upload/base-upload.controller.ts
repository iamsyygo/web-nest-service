import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  Get,
  Param,
  Res,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { BaseUploadService } from './base-upload.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PaginateImageDto, ImageDto, ImagesDto } from './dto/image.dto';
import { query } from 'express';
import { BaseUploadDto } from './dto/base-upload.dto';

@ApiTags('公共上传文件')
@Controller('upload')
export class BaseUploadController {
  constructor(private readonly baseUploadService: BaseUploadService) {}

  @ApiOperation({ summary: '上传文件图片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '图片文件',
    type: ImageDto,
  })
  @Post('/image')
  @UseInterceptors(FileInterceptor('file')) // file对应前端的key
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /image\/(jpg|png|gif|jpeg)/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build(),
    )
    file: any,
  ) {
    return this.baseUploadService.uploadImage(file);
  }

  @ApiOperation({ summary: '获取图片资源' })
  @Get('/images/temp/:id')
  async getImage(@Param('id') id: string, @Res() res) {
    const _res = await this.baseUploadService.readImage(id);
    res.writeHead(200, {
      'Content-Type': _res.data.fileType || 'image/jpeg',
      'Content-Disposition': `inline; filename=${encodeURI(_res.data.realFilename)}`,
    });
    res.end(_res.file);
  }

  @ApiOperation({ summary: '下载图片资源' })
  @Get('/images/download/:id')
  async downloadImage(@Param('id') id: string, @Res() res) {
    const _res = await this.baseUploadService.readImage(id);
    res.writeHead(200, {
      'Content-Type': _res.data.fileType || 'image/jpeg',
      'Content-Disposition': `attachment; filename=${encodeURI(_res.data.realFilename)}`,
    });
    res.end(_res.file);
  }

  @ApiOperation({ summary: '多文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '图片文件',
    type: ImagesDto,
  })
  @Post('/images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(@UploadedFiles() files: any) {
    return this.baseUploadService.uploadImages(files);
  }

  @ApiOperation({ summary: '获取图片资源列表' })
  @Get('/images/list')
  async getImageList(@Query() query: PaginateImageDto) {
    return this.baseUploadService.getImageList(query);
  }

  @ApiOperation({ summary: '公共资源上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '文件',
    type: BaseUploadDto,
  })
  @Post('/images/base/upload')
  @UseInterceptors(FileInterceptor('file')) // file对应前端的key
  async baseUpload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          // 文件大小限制 10M
          maxSize: 1024 * 1024 * 10,
        })
        .build(),
    )
    file: any,
  ) {
    return this.baseUploadService.baseUpload(file);
  }

  @ApiOperation({ summary: '下载公共资源' })
  @Get('/base/resources/download/:id')
  async downloadBase(@Param('id') id: string, @Res() res) {
    const _res = await this.baseUploadService.downloadBase(id);

    res.writeHead(200, {
      'Content-Type': _res.data[0].fileType,
      'Content-Disposition': `attachment; filename=${encodeURI(_res.data[0].realFilename)}`,
    });
    res.end(_res.file[0]);
  }

  @ApiOperation({ summary: '读取公共资源' })
  @Get('/base/resources/read/:id')
  async readdBase(@Param('id') id: string, @Res() res) {
    const _res = await this.baseUploadService.downloadBase(id);

    res.writeHead(200, {
      'Content-Type': _res.data[0].fileType,
      'Content-Disposition': `inline; filename=${encodeURI(_res.data[0].realFilename)}`,
    });
    res.end(_res.file[0]);
  }
}
