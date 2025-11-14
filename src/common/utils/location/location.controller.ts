import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProvinceDto, CommuneDto } from '@/common/dto/location.dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('provinces')
  @ApiOperation({
    summary: 'Lấy danh sách tất cả các tỉnh/thành phố',
    description: 'Trả về một mảng chứa thông tin của tất cả các tỉnh thành.',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tỉnh thành được trả về thành công.',
    type: ProvinceDto,
    isArray: true,
  })
  async getProvinces() {
    return this.locationService.getProvinces();
  }

  @Get('communes')
  @ApiOperation({
    summary: 'Lấy danh sách tất cả các xã/phường',
    description:
      'Cẩn thận khi sử dụng, có thể trả về một lượng dữ liệu rất lớn.',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách xã/phường được trả về thành công.',
    type: CommuneDto,
    isArray: true,
  })
  async getCommunes() {
    return this.locationService.getCommunes();
  }

  @Get('provinces/:code/communes')
  @ApiOperation({
    summary: 'Lấy danh sách xã/phường theo mã tỉnh/thành phố',
    description:
      'Sử dụng mã code của tỉnh/thành phố để lọc danh sách xã/phường trực thuộc.',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'Mã code của tỉnh/thành phố (Ví dụ: 01 cho Hà Nội).',
    example: '01',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách xã/phường đã được lọc theo code tỉnh/thành phố.',
    type: CommuneDto,
    isArray: true,
  })
  async getCommunesByProvince(@Param('code') code: string) {
    return this.locationService.getCommunesByProvince(code);
  }
}
