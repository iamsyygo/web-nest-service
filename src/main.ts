import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { AllResponseInterceptor } from './interceptor/all-response.interceptor';
import { AnyExceptionFilter } from './filter/any-exception.filter';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new AllResponseInterceptor());
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      //  自定义错误信息 - 管道验证
      // exceptionFactory: (errors) => {
      //   // console.log(errors);
      //   // 仅返回错误文字
      //   // const message = errors
      //   //   .map((item) => {
      //   //     return Object.values(item.constraints);
      //   //   })
      //   //   .flat();
      //   // return message;
      // },
    }),
  ); //开启一个全局验证管道
  createSwaggerDocument(app);
  const configService = app.get(ConfigService);

  const http = configService.get('http');
  const secret = configService.get('cookie').secret || 'IafHY7HGi687';

  app.use(cookieParser(secret));

  const port = http.port || 3000;
  await app.listen(port);

  Logger.log(`http://${http.host}:${port}`, '服务器启动成功');
  Logger.log(`http://${http.host}:${port}/docs`, 'Swagger 文档地址');
}

bootstrap();
