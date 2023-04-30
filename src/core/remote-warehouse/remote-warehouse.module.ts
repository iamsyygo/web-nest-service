import { Module } from '@nestjs/common';
import { RemoteWarehouseService } from './remote-warehouse.service';
import { RemoteWarehouseController } from './remote-warehouse.controller';

@Module({
  controllers: [RemoteWarehouseController],
  providers: [RemoteWarehouseService]
})
export class RemoteWarehouseModule {}
