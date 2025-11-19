import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface AdminJwtPayload {
  id: string;
  username: string;
  role_id: string;
  store_id?: string;
}

interface RequestWithAdmin extends Request {
  admin?: AdminJwtPayload;
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithAdmin>();

    const authHeader = request.headers['authorization'];

    if (
      !authHeader ||
      typeof authHeader !== 'string' ||
      !authHeader.startsWith('Bearer ')
    ) {
      throw new UnauthorizedException('Token truyền vào không hợp lệ.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token không được cung cấp.');
    }

    try {
      const payload = this.jwtService.verify<AdminJwtPayload>(token, {
        secret: process.env.ADMIN_SECRET_KEY as string,
      });

      if (payload.role_id !== 'admin') {
        throw new UnauthorizedException('Bạn không có quyền truy cập.');
      }

      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn.');
    }
  }
}
