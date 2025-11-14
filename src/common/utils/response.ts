import { Expose, Type } from 'class-transformer';
import moment from 'moment-timezone';
import { CommuneDto, ProvinceDto } from '@/common/dto/location.dto';

export interface IResponseData<T> {
  statuscode: number;
  message: string;
  data: T;
  timestamp: string;
}

export class BaseResponseModel {
  readonly statusCode: number;
  readonly message: string;
  readonly timestamp: string;

  constructor(
    statusCode: number,
    message: string,
    timeZone: string = 'Asia/Ho_Chi_Minh',
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = moment().tz(timeZone).format('DD-MM-YYYY HH:mm:ss');
  }
}

export class PaginationSet<T> {
  readonly page: number;
  readonly limit: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly data: T[];

  constructor(page: number, limit: number, totalItems: number, data: T[]) {
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1;
    this.data = data;
  }
}

export class ResponseContentModel<T> extends BaseResponseModel {
  readonly data: T | T[] | PaginationSet<T> | null;

  constructor(
    statusCode: number,
    message: string,
    data: T | T[] | PaginationSet<T> | null,
    timestamp?: string,
  ) {
    super(statusCode, message, timestamp);
    this.data = data;
  }
}

export class ErrorResponseModel<
  T = string[] | Record<string, any>,
> extends BaseResponseModel {
  readonly errors: T;

  constructor(
    statusCode: number,
    message: string,
    errors: T,
    timestamp?: string,
  ) {
    super(statusCode, message, timestamp);
    this.errors = errors;
  }
}

export class ProvinceResponseDto {
  @Expose()
  requestId: string;

  @Expose()
  @Type(() => ProvinceDto)
  provinces: ProvinceDto[];
}

export class CommuneResponseDto {
  @Expose()
  requestId: string;

  @Expose()
  @Type(() => CommuneDto)
  communes: CommuneDto[];
}
