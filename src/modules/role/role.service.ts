import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  CreateRoleDto,
  RoleQueryDto,
  UpdateRoleDto,
} from '@/common/dto/role.dto';
import { Role } from '@/common/schema/role.schema';
import { PaginationSet } from '@/common/utils/response';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    if (dto.code) {
      await this.ensureRoleCodeUnique(dto.code);
    }

    const parentRoleId = dto.parent_role_id
      ? await this.ensureParentRole(dto.parent_role_id)
      : null;

    const createdRole = await this.roleModel.create({
      ...dto,
      parent_role_id: parentRoleId,
    });

    return createdRole.toObject();
  }

  async findAll(query: RoleQueryDto): Promise<PaginationSet<Role>> {
    const { page = 1, limit = 20, search, status } = query;
    const filter: FilterQuery<Role> = { isDeleted: false };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, totalItems] = await Promise.all([
      this.roleModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.roleModel.countDocuments(filter),
    ]);

    return new PaginationSet<Role>(page, limit, totalItems, data);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findOne({
      _id: this.toObjectId(id),
      isDeleted: false,
    });

    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò.');
    }

    return role;
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    const roleId = this.toObjectId(id);

    const currentRole = await this.roleModel.findOne({
      _id: roleId,
      isDeleted: false,
    });

    if (!currentRole) {
      throw new NotFoundException('Không tìm thấy vai trò.');
    }

    if (dto.code && dto.code !== currentRole.code) {
      await this.ensureRoleCodeUnique(dto.code, roleId);
    }

    let parentRoleId: Types.ObjectId | null | undefined;

    if (dto.parent_role_id === null) {
      parentRoleId = null;
    } else if (dto.parent_role_id) {
      parentRoleId = await this.ensureParentRole(dto.parent_role_id, roleId);
    }

    const updatedRole = await this.roleModel.findOneAndUpdate(
      { _id: roleId, isDeleted: false },
      {
        ...dto,
        ...(parentRoleId !== undefined && {
          parent_role_id: parentRoleId,
        }),
      },
      { new: true },
    );

    if (!updatedRole) {
      throw new NotFoundException('Không tìm thấy vai trò.');
    }

    return updatedRole;
  }

  async remove(id: string): Promise<Role> {
    const roleId = this.toObjectId(id);

    const deletedRole = await this.roleModel.findOneAndUpdate(
      { _id: roleId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date(), status: 'inactive' },
      { new: true },
    );

    if (!deletedRole) {
      throw new NotFoundException('Không tìm thấy vai trò.');
    }

    return deletedRole;
  }

  private async ensureParentRole(
    parentId: string | Types.ObjectId,
    currentRoleId?: Types.ObjectId,
  ): Promise<Types.ObjectId> {
    const normalizedParentId = this.toObjectId(parentId);

    if (currentRoleId && normalizedParentId.equals(currentRoleId)) {
      throw new BadRequestException('Không thể chọn chính nó làm vai trò cha.');
    }

    const parentRole = await this.roleModel.findOne({
      _id: normalizedParentId,
      isDeleted: false,
    });

    if (!parentRole) {
      throw new BadRequestException('Vai trò cha không tồn tại.');
    }

    return normalizedParentId;
  }

  private async ensureRoleCodeUnique(
    code: string,
    excludeId?: Types.ObjectId,
  ): Promise<void> {
    const filter: FilterQuery<Role> = { code };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const existingRole = await this.roleModel.exists(filter);

    if (existingRole) {
      throw new BadRequestException('Mã vai trò đã tồn tại.');
    }
  }

  private toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    if (id instanceof Types.ObjectId) {
      return id;
    }

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Id không hợp lệ.');
    }

    return new Types.ObjectId(id);
  }
}
