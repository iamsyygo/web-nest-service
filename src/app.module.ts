import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeRemoveModule } from './core/code-remove/code-remove.module';
import { RemoteWarehouseModule } from './core/remote-warehouse/remote-warehouse.module';
import { getTypeOrmModule } from './config';
import { RbacModule } from './core/rbac/rbac.module';

@Module({
  imports: [getTypeOrmModule(), CodeRemoveModule, RemoteWarehouseModule, RbacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
