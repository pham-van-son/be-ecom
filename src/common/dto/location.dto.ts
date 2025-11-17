import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProvinceDto {
  @ApiProperty({ example: '01' })
  @Expose()
  code: string;

  @ApiProperty({ example: 'Hà Nội' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Ha Noi' })
  @Expose()
  englishName: string;

  @ApiProperty({ example: 'Thành phố trực thuộc Trung ương' })
  @Expose()
  administrativeLevel: string;

  @ApiProperty({ example: '24/NQ-TW' })
  @Expose()
  decree: string;
}

export class ProvinceResponseDto {
  @ApiProperty()
  @Expose()
  requestId: string;

  @ApiProperty({ type: ProvinceDto, isArray: true })
  @Expose()
  @Type(() => ProvinceDto)
  provinces: ProvinceDto[];
}

export class CommuneDto {
  @ApiProperty({ example: '00001' })
  @Expose()
  code: string;

  @ApiProperty({ example: 'Phúc Xá' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Phuc Xa' })
  @Expose()
  englishName: string;

  @ApiProperty({ example: 'Phường' })
  @Expose()
  administrativeLevel: string;

  @ApiProperty({ example: '01' })
  @Expose()
  provinceCode: string;

  @ApiProperty({ example: 'Thành phố Hà Nội' })
  @Expose()
  provinceName: string;

  @ApiProperty({ example: '24/NQ-TW' })
  @Expose()
  decree: string;
}

export class CommuneResponseDto {
  @ApiProperty()
  @Expose()
  requestId: string;

  @ApiProperty({ type: CommuneDto, isArray: true })
  @Expose()
  @Type(() => CommuneDto)
  communes: CommuneDto[];
}
