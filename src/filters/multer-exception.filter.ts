import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof Error) {
      res.status(400).json({
        statusCode: 400,
        message: exception.message,
        error: 'Bad Request',
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      });
    }
  }
}
