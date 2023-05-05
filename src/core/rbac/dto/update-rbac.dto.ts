import { PartialType } from '@nestjs/swagger';
import { CreateRbacUserDto } from './create-rbac.dto';

export class UpdateRbacDto extends PartialType(CreateRbacUserDto) {}
