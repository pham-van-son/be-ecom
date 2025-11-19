import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString({ message: 'Tên đăng nhập phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống.' })
  @MinLength(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' })
  @MaxLength(50, { message: 'Tên đăng nhập không được vượt quá 50 ký tự.' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
  @MaxLength(100, { message: 'Mật khẩu không được vượt quá 100 ký tự.' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi.' })
  @MaxLength(255, { message: 'Họ tên không được vượt quá 255 ký tự.' })
  fullName?: string;

  @IsMongoId({ message: 'Vai trò không hợp lệ.' })
  @IsNotEmpty({ message: 'Vai trò không được để trống.' })
  role_id: string | Types.ObjectId;

  @IsOptional()
  @IsMongoId({ message: 'Cửa hàng không hợp lệ.' })
  store_id?: string | Types.ObjectId | null;

  @IsOptional()
  @IsArray({ message: 'Danh sách IP phải là mảng.' })
  @IsString({ each: true, message: 'Mỗi IP phải là chuỗi.' })
  allowed_ips?: string[];

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ có thể là active hoặc inactive',
  })
  status?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi.' })
  @MaxLength(255, { message: 'Họ tên không được vượt quá 255 ký tự.' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
  @MaxLength(100, { message: 'Mật khẩu không được vượt quá 100 ký tự.' })
  password?: string;

  @IsOptional()
  @IsMongoId({ message: 'Vai trò không hợp lệ.' })
  role_id?: string | Types.ObjectId;

  @IsOptional()
  @IsMongoId({ message: 'Cửa hàng không hợp lệ.' })
  store_id?: string | Types.ObjectId | null;

  @IsOptional()
  @IsArray({ message: 'Danh sách IP phải là mảng.' })
  @IsString({ each: true, message: 'Mỗi IP phải là chuỗi.' })
  allowed_ips?: string[];

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ có thể là active hoặc inactive',
  })
  status?: string;
}

export class LoginDto {
  @IsString({ message: 'Tên đăng nhập phải là chuỗi.' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống.' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  password: string;
}

export class UserQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsMongoId({ message: 'role_id không hợp lệ.' })
  role_id?: string;

  @IsOptional()
  @IsMongoId({ message: 'store_id không hợp lệ.' })
  store_id?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ có thể là active hoặc inactive',
  })
  status?: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
