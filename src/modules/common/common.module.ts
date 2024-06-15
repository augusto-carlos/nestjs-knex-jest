import { ApiKeyGuard } from '@core/guards/api-key/api-key.guard';
import { LoggerMiddleware } from '@core/middleware/logger/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from 'src/core/interceptors/timeout/timeout.interceptor';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('users/*').forRoutes('*');
    // consumer.apply(LoggerMiddleware).exclude('users/*').forRoutes('*'); <- for exclude certain routes
  }
}
