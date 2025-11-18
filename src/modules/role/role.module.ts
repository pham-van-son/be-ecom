import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '@/common/schema/role.schema';
import { AdminAuthGuard } from '@/common/middlewares/admin.middleware';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    JwtModule.register({}),
  ],
  controllers: [RoleController],
  providers: [RoleService, AdminAuthGuard],
})
export class RoleModule {}
