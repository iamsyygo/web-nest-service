import { Injectable } from '@nestjs/common';
import { CreateRemoteWarehouseDto } from './dto/create-remote-warehouse.dto';
import { UpdateRemoteWarehouseDto } from './dto/update-remote-warehouse.dto';

@Injectable()
export class RemoteWarehouseService {
  create(createRemoteWarehouseDto: CreateRemoteWarehouseDto) {
    return 'This action adds a new remoteWarehouse';
  }

  findAll() {
    return `This action returns all remoteWarehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remoteWarehouse`;
  }

  update(id: number, updateRemoteWarehouseDto: UpdateRemoteWarehouseDto) {
    return `This action updates a #${id} remoteWarehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} remoteWarehouse`;
  }
}
