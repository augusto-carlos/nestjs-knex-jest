import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ApiKeyFilter<T extends ForbiddenException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    console.log('REQ/RES LIFE CYCLE -> FILTERS');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response == 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    if (!request.headers['x-api-key']) {
      error['message'] = 'x-api-key header not provided';
      // perform some logic
    }

    response.status(status).json({
      ...error,
      timestamp: new Date().toLocaleDateString('pt'),
    });
  }
}
