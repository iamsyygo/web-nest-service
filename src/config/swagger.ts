import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerDocument = (app) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS 接口文档')
    .setDescription('🛵 不断更新中...')
    .setVersion('1.0.6')
    .setExternalDoc('nestjs 官网', 'https://docs.nestjs.com/')
    // 添加用户认证
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
