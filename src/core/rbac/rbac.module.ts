import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacUser } from './entities/user.entity';
import { RbacRole } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RbacUser, RbacRole])],
  controllers: [RbacController],
  providers: [RbacService],
})
export class RbacModule {}
