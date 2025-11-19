import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from '@/common/middlewares/admin.middleware';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  UserQueryDto,
} from '@/common/dto/user.dto';
import { ResponseContentModel } from '@/common/utils/response';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.userService.login(loginDto);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Đăng nhập thành công',
      result,
    );
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new ResponseContentModel(
      HttpStatus.CREATED,
      'Tạo người dùng thành công',
      user,
    );
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  async findAll(@Query() query: UserQueryDto) {
    const users = await this.userService.findAll(query);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Danh sách người dùng',
      users,
    );
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return new ResponseContentModel(HttpStatus.OK, 'Chi tiết người dùng', user);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Cập nhật người dùng thành công',
      user,
    );
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Xóa người dùng thành công',
      user,
    );
  }
}
