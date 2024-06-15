import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    console.time('request-response time');
    console.log('REQ/RES LIFE CYCLE -> MIDDLEWARES');

    res.on('finish', () => console.timeEnd('request-response time'));
    next();
  }
}
