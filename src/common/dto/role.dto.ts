import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoleDto {
  @IsString({ message: 'Tên vai trò phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên vai trò không được để trống.' })
  @MaxLength(100, { message: 'Tên vài trò không được vượt quá 100 ký tự.' })
  name: string;

  @IsOptional()
  @IsUUID('6', { message: 'Mã vai trò phải là UUID v4 hợp lệ.' })
  code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Mô tả không dược vượt quá 500 ký tự.' })
  description?: string;

  @IsOptional()
  @IsMongoId({ message: 'parent_role_id không hợp lệ' })
  parent_role_id?: string | Types.ObjectId;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ có thể là active hoặc inactive',
  })
  status?: string;
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString({ message: 'Tên vai trò phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Mã vai trò phải là UUID v4 hợp lệ.' })
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;

  @IsOptional()
  @IsMongoId({ message: 'parent_role_id không hợp lệ' })
  parent_role_id?: string | Types.ObjectId | null;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}

export class RoleQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}
