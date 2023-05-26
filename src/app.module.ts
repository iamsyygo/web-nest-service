import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeRemoveModule } from './core/code-remove/code-remove.module';
import { RemoteWarehouseModule } from './core/remote-warehouse/remote-warehouse.module';
import { getTypeOrmModule, getYml } from './config';
import { RbacModule } from './core/rbac/rbac.module';
import { APP_GUARD } from '@nestjs/core';
import { CookieModule } from './core/cookie/cookie.module';
import { BaseUploadModule } from './core/base-upload/base-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getYml], // 加载配置文件(注意: 不需要手动执行 getYml 会自动执行)
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // 1分钟
      limit: 10, // 请求10次
    }),
    getTypeOrmModule(),
    CodeRemoveModule,
    RemoteWarehouseModule,
    RbacModule,
    CookieModule,
    BaseUploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //全局使用
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
