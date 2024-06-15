import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  healthCheck() {
    console.log(this.configService.get('DATABASE_CLIENT'));
    return 'Application is OK';
  }
}
