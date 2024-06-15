import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const time = Number(process.env.TIMEOUT || 3000);

    console.log('REQ/RES LIFE CYCLE -> INTERCEPTORS');

    return next.handle().pipe(
      timeout(time),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          const seconds = time / 1000;
          const message = `Request Timeout after ${seconds}s`;

          throw new RequestTimeoutException(message);
        }
        throw err;
      }),
    );
  }
}
