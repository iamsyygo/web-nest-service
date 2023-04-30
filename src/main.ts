import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument, getYml } from './config';
import { AllResponseInterceptor } from './interceptor/all-response.interceptor';
import { AnyExceptionFilter } from './filter/any-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new AllResponseInterceptor());
  app.useGlobalFilters(new AnyExceptionFilter());
  createSwaggerDocument(app);
  await app.listen(3000);
}

bootstrap();
