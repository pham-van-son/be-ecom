import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { CommuneResponseDto, ProvinceResponseDto } from '../response';
import { removeVietnameseTones } from '../removeVietnameseTones';

@Injectable()
export class LocationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get baseUrl(): string {
    const url = this.configService.get<string>('API_LOCATION');
    if (!url) {
      throw new Error('Missing env: API_LOCATION');
    }

    return url;
  }

  async getProvinces(): Promise<ProvinceResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<ProvinceResponseDto>(`${this.baseUrl}/provinces`),
    );

    const result = plainToInstance(ProvinceResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  async getCommunes(): Promise<CommuneResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<CommuneResponseDto>(`${this.baseUrl}/communes`),
    );

    const result = plainToInstance(CommuneResponseDto, data, {
      excludeExtraneousValues: true,
    });

    result.communes = result.communes.map((c) => {
      if (!c.englishName || c.englishName.trim() === '') {
        const nameWithoutPrefix = c.name.replace(
          /^(Xã|Phường|Thị trấn|Quận|Huyện|Thành phố)\s+/i,
          '',
        );
        c.englishName = removeVietnameseTones(nameWithoutPrefix);
      }
      return c;
    });

    return result;
  }

  async getCommunesByProvince(code: string): Promise<CommuneResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<CommuneResponseDto>(
        `${this.baseUrl}/provinces/${code}/communes`,
      ),
    );

    const result = plainToInstance(CommuneResponseDto, data, {
      excludeExtraneousValues: true,
    });

    result.communes = result.communes.map((c) => {
      if (!c.englishName || c.englishName.trim() === '') {
        const nameWithoutPrefix = c.name.replace(
          /^(Xã|Phường|Thị trấn|Quận|Huyện|Thành phố)\s+/i,
          '',
        );
        c.englishName = removeVietnameseTones(nameWithoutPrefix);
      }
      return c;
    });

    return result;
  }
}
