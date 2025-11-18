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
  CreateRoleDto,
  RoleQueryDto,
  UpdateRoleDto,
} from '@/common/dto/role.dto';
import { ResponseContentModel } from '@/common/utils/response';
import { RoleService } from './role.service';

@Controller('roles')
@UseGuards(AdminAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return new ResponseContentModel(
      HttpStatus.CREATED,
      'Tạo vai trò thành công',
      role,
    );
  }

  @Get()
  async findAll(@Query() query: RoleQueryDto) {
    const roles = await this.roleService.findAll(query);
    return new ResponseContentModel(HttpStatus.OK, 'Danh sách vai trò', roles);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    return new ResponseContentModel(HttpStatus.OK, 'Chi tiết vai trò', role);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.roleService.update(id, updateRoleDto);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Cập nhật vai trò thành công',
      role,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const role = await this.roleService.remove(id);
    return new ResponseContentModel(
      HttpStatus.OK,
      'Xóa vai trò thành công',
      role,
    );
  }
}
