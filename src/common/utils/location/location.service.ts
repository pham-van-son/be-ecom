import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { CommuneResponseDto, ProvinceResponseDto } from '../response';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { removeVietnameseTones } from '../removeVietnameseTones';

@Injectable()
export class LocationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,

    @Inject(CACHE_MANAGER) private readonly cacheManager: any,
  ) {}

  private get baseUrl(): any {
    return this.configService.get<any>('API_LOCATION');
  }

  async getProvinces(): Promise<ProvinceResponseDto> {
    const cacheKey = 'provinces';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/provinces`),
    );

    const result = plainToInstance(ProvinceResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  async getCommunes(): Promise<CommuneResponseDto> {
    const cacheKey = 'communes';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/communes`),
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

    await this.cacheManager.set(cacheKey, result, { ttl: 3600 });
    return result;
  }

  async getCommunesByProvince(code: string): Promise<CommuneResponseDto> {
    const cacheKey = `communes_${code}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/provinces/${code}/communes`),
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

    await this.cacheManager.set(cacheKey, result, { ttl: 3600 });
    return result;
  }
}
