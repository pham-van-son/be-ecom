import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProvinceDto {
  @ApiProperty({ example: '01', description: 'Mã code của tỉnh/thành phố' })
  code: string;

  @ApiProperty({
    example: 'Hà Nội',
    description: 'Tên tiếng Việt của tỉnh/thành phố',
  })
  name: string;

  @ApiProperty({
    example: 'Ha Noi',
    description: 'Tên tiếng Anh của tỉnh/thành phố',
  })
  englishName: string;

  @ApiProperty({
    example: 'Thành phố trực thuộc Trung ương',
    description: 'Cấp hành chính',
  })
  administrativeLevel: string;

  @ApiProperty({
    example: '24/NQ-TW',
    description: 'Văn bản quyết định thành lập',
  })
  decree: string;
}

export class CommuneDto {
  @ApiProperty({ example: '00001', description: 'Mã code của xã/phường' })
  code: string;

  @ApiProperty({
    example: 'Phúc Xá',
    description: 'Tên tiếng Việt của xã/phường',
  })
  name: string;

  @ApiProperty({
    example: 'Phuc Xa',
    description: 'Tên tiếng Anh của xã/phường',
  })
  englishName: string;

  @ApiProperty({ example: 'Phường', description: 'Cấp hành chính' })
  administrativeLevel: string;

  @ApiProperty({
    example: '01',
    description: 'Mã code của tỉnh/thành phố trực thuộc',
  })
  provinceCode: string;

  @ApiProperty({
    example: 'Thành phố Hà Nội',
    description: 'Tên tỉnh/thành phố trực thuộc',
  })
  provinceName: string;

  @ApiProperty({
    example: '24/NQ-TW',
    description: 'Văn bản quyết định thành lập',
  })
  decree: string;
}
