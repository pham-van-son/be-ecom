import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { FilterQuery, Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  UserQueryDto,
} from '@/common/dto/user.dto';
import { User } from '@/common/schema/user.schema';
import { Role } from '@/common/schema/role.schema';
import { Store } from '@/common/schema/store.schema';
import { PaginationSet } from '@/common/utils/response';

interface JwtPayload {
  id: string;
  username: string;
  role_id: string;
  store_id?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.ensureUsernameUnique(dto.username);
    await this.ensureRoleExists(dto.role_id);

    if (dto.store_id) {
      await this.ensureStoreExists(dto.store_id);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const createdUser = await this.userModel.create({
      ...dto,
      password: hashedPassword,
      role_id: this.toObjectId(dto.role_id),
      store_id: dto.store_id ? this.toObjectId(dto.store_id) : null,
    });

    return createdUser.toObject();
  }

  async findAll(query: UserQueryDto): Promise<PaginationSet<User>> {
    const { page = 1, limit = 20, search, role_id, store_id, status } = query;
    const filter: FilterQuery<User> = { isDeleted: false };

    if (status) {
      filter.status = status;
    }

    if (role_id) {
      filter.role_id = this.toObjectId(role_id);
    }

    if (store_id !== undefined) {
      if (store_id === null) {
        filter.store_id = null;
      } else {
        filter.store_id = this.toObjectId(store_id);
      }
    }

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, totalItems] = await Promise.all([
      this.userModel
        .find(filter)
        .populate('role_id', 'name code')
        .populate('store_id', 'name code')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean<User[]>(),
      this.userModel.countDocuments(filter),
    ]);

    return new PaginationSet<User>(page, limit, totalItems, data);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: this.toObjectId(id), isDeleted: false })
      .populate('role_id', 'name code')
      .populate('store_id', 'name code')
      .lean<User>();

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const userId = this.toObjectId(id);

    const currentUser = await this.userModel.findOne({
      _id: userId,
      isDeleted: false,
    });

    if (!currentUser) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }

    if (dto.role_id) {
      await this.ensureRoleExists(dto.role_id);
    }

    if (dto.store_id !== undefined) {
      if (dto.store_id === null) {

      } else {
        await this.ensureStoreExists(dto.store_id);
      }
    }

    const updateData: Record<string, unknown> = {};

    if (dto.fullName !== undefined) {
      updateData.fullName = dto.fullName;
    }

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role_id) {
      updateData.role_id = this.toObjectId(dto.role_id);
    }

    if (dto.store_id !== undefined) {
      updateData.store_id = dto.store_id ? this.toObjectId(dto.store_id) : null;
    }

    if (dto.allowed_ips !== undefined) {
      updateData.allowed_ips = dto.allowed_ips;
    }

    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }

    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: userId, isDeleted: false }, updateData, {
        new: true,
      })
      .populate('role_id', 'name code')
      .populate('store_id', 'name code')
      .lean<User>();

    if (!updatedUser) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const userId = this.toObjectId(id);

    const deletedUser = await this.userModel
      .findOneAndUpdate(
        { _id: userId, isDeleted: false },
        { isDeleted: true, deletedAt: new Date(), status: 'inactive' },
        { new: true },
      )
      .lean<User>();

    if (!deletedUser) {
      throw new NotFoundException('Không tìm thấy người dùng.');
    }

    return deletedUser;
  }

  async login(dto: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.userModel
      .findOne({
        username: dto.username,
        isDeleted: false,
        status: 'active',
      })
      .populate('role_id', 'name code')
      .populate('store_id', 'name code')
      .lean<User>();

    if (!user) {
      throw new UnauthorizedException(
        'Tên đăng nhập hoặc mật khẩu không đúng.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Tên đăng nhập hoặc mật khẩu không đúng.',
      );
    }

    let roleId: string;
    if (typeof user.role_id === 'object' && user.role_id !== null) {
      const roleObj = user.role_id as { _id?: Types.ObjectId } & Types.ObjectId;
      roleId = roleObj._id?.toString() || roleObj.toString();
    } else {
      roleId = (user.role_id as Types.ObjectId).toString();
    }

    let storeId: string | undefined;
    if (user.store_id) {
      if (typeof user.store_id === 'object' && user.store_id !== null) {
        const storeObj = user.store_id as {
          _id?: Types.ObjectId;
        } & Types.ObjectId;
        storeId = storeObj._id?.toString() || storeObj.toString();
      } else {
        storeId = (user.store_id as Types.ObjectId).toString();
      }
    }

    const userId = (user._id as Types.ObjectId).toString();

    const payload: JwtPayload = {
      id: userId,
      username: user.username,
      role_id: roleId,
      store_id: storeId,
    };

    const jwtOptions = {
      secret: process.env.ADMIN_SECRET_KEY as string,
      expiresIn: process.env.ADMIN_JWT_TIME || '7d',
    };

    const token = (
      this.jwtService as unknown as {
        sign: (payload: JwtPayload, options: typeof jwtOptions) => string;
      }
    ).sign(payload, jwtOptions);

    const { password: _password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword as User,
      token,
    };
  }

  private async ensureUsernameUnique(
    username: string,
    excludeUserId?: Types.ObjectId,
  ): Promise<void> {
    const filter: FilterQuery<User> = {
      username,
      isDeleted: false,
    };

    if (excludeUserId) {
      filter._id = { $ne: excludeUserId };
    }

    const existingUser = await this.userModel.findOne(filter);

    if (existingUser) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại.');
    }
  }

  private async ensureRoleExists(
    roleId: string | Types.ObjectId,
  ): Promise<void> {
    const role = await this.roleModel.findOne({
      _id: this.toObjectId(roleId),
      isDeleted: false,
    });

    if (!role) {
      throw new BadRequestException('Vai trò không tồn tại.');
    }
  }

  private async ensureStoreExists(
    storeId: string | Types.ObjectId,
  ): Promise<void> {
    const store = await this.storeModel.findOne({
      _id: this.toObjectId(storeId),
      isDeleted: false,
    });

    if (!store) {
      throw new BadRequestException('Cửa hàng không tồn tại.');
    }
  }

  private toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === 'string' ? new Types.ObjectId(id) : id;
  }
}
