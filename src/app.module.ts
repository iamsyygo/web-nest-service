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
import { SystemDictModule } from './core/system-dict/system-dict.module';
import { SystemMenuModule } from './core/system-menu/system-menu.module';
import { DemoModule } from './core/demo/demo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      // 加载配置文件(注意: 不需要手动执行 getYml 会自动执行)
      load: [getYml],
      cache: true,
      // encoding: 'utf-8', // 编码
    }),
    // 配置节流器，限制每分钟 10 次请求
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    getTypeOrmModule(),
    CodeRemoveModule,
    RemoteWarehouseModule,
    RbacModule,
    CookieModule,
    BaseUploadModule,
    SystemDictModule,
    SystemMenuModule,
    DemoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局使用注入
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
