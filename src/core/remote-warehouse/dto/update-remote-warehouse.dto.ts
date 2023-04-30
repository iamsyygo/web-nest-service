import { PartialType } from '@nestjs/mapped-types';
import { CreateRemoteWarehouseDto } from './create-remote-warehouse.dto';

export class UpdateRemoteWarehouseDto extends PartialType(CreateRemoteWarehouseDto) {}
