import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyFilter } from './core/filters/api-key/api-key.filter';
import { SerializeInterceptor } from './core/interceptors/serialize/serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );
  // app.useGlobalGuards(new ApiKeyGuard()); // <- global guard, common approach when the class does not have any dependencies

  app.useGlobalFilters(new ApiKeyFilter());
  app.useGlobalInterceptors(new SerializeInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
