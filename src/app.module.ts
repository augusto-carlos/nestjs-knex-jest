import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import appConfig from './config/env.config';
import { CommonModule } from './modules/common/common.module';
@Module({
  imports: [
    // ConfigModule,
    CommonModule,
    ConfigModule.forRoot({
      load: [appConfig], // <- to configure custom env variables
      validationSchema: Joi.object({
        DATABASE_CLIENT: Joi.required(),
        // DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
