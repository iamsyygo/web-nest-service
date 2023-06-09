import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RbacUser } from './entities/user.entity';
import { RbacRole } from './entities/role.entity';
import { jwtModule, JwtStrategy } from 'src/config';

@Module({
  imports: [TypeOrmModule.forFeature([RbacUser, RbacRole]), jwtModule],
  controllers: [RbacController],
  exports: [jwtModule],
  providers: [RbacService, JwtStrategy],
})
export class RbacModule {}
