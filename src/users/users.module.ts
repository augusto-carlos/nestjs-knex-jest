import { Module } from '@nestjs/common';
import { UsersController } from './services/controllers/users.controller';
import { UsersService } from './services/users/users.service';
import { DBConfig } from 'src/config/db';

@Module({
  exports: [],
  controllers: [UsersController],
  providers: [UsersService, DBConfig],
})
export class UsersModule {
  constructor(private dbConfig: DBConfig) {}
}
