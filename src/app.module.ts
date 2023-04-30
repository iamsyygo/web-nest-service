import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeRemoveModule } from './core/code-remove/code-remove.module';
import { RemoteWarehouseModule } from './core/remote-warehouse/remote-warehouse.module';
import { getTypeOrmModule } from './config';

@Module({
  imports: [getTypeOrmModule(), CodeRemoveModule, RemoteWarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
