import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseModel } from '@/common/utils/response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      let message: string;
      let errorPayload: Record<string, unknown> | { message: unknown };

      if (typeof res === 'string') {
        message = res;
        errorPayload = { message: res };
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, unknown>;
        const rawMessage = resObj.message;

        if (typeof rawMessage === 'string') {
          message = rawMessage;
        } else if (Array.isArray(rawMessage)) {
          message = rawMessage.join(', ');
        } else {
          message = 'Có lỗi xảy ra.';
        }

        errorPayload = resObj;
      } else {
        message = 'Có lỗi xảy ra.';
        errorPayload = { message: res };
      }

      const errorResponse = new ErrorResponseModel(
        status,
        message,
        errorPayload,
      );

      return response.status(status).json(errorResponse);
    }

    let stack: string | undefined;
    if (exception instanceof Error) {
      stack = exception.stack;
    }

    this.logger.error(
      `Unhandled exception at ${request.method} ${request.url}`,
      stack,
    );

    const message =
      exception instanceof Error
        ? exception.message
        : 'Có lỗi xảy ra khi xử lý yêu cầu.';

    const errorResponse = new ErrorResponseModel(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      { message },
    );

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errorResponse);
  }
}
