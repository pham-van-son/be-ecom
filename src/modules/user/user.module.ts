import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/common/schema/user.schema';
import { Role, RoleSchema } from '@/common/schema/role.schema';
import { Store, StoreSchema } from '@/common/schema/store.schema';
import { AdminAuthGuard } from '@/common/middlewares/admin.middleware';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, AdminAuthGuard],
  exports: [UserService],
})
export class UserModule {}
