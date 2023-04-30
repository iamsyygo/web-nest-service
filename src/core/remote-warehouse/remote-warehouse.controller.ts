import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemoteWarehouseService } from './remote-warehouse.service';
import { CreateRemoteWarehouseDto } from './dto/create-remote-warehouse.dto';
import { UpdateRemoteWarehouseDto } from './dto/update-remote-warehouse.dto';

@Controller('remote-warehouse')
export class RemoteWarehouseController {
  constructor(private readonly remoteWarehouseService: RemoteWarehouseService) {}

  @Post()
  create(@Body() createRemoteWarehouseDto: CreateRemoteWarehouseDto) {
    return this.remoteWarehouseService.create(createRemoteWarehouseDto);
  }

  @Get()
  findAll() {
    return this.remoteWarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remoteWarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemoteWarehouseDto: UpdateRemoteWarehouseDto) {
    return this.remoteWarehouseService.update(+id, updateRemoteWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remoteWarehouseService.remove(+id);
  }
}
