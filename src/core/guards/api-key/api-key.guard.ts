import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC } from 'src/core/decorators/public-endpoint.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC,
      context.getHandler(),
    );
    console.log('REQ/RES LIFE CYCLE -> GUARDS');
    // skip api key validation if it's a public endpoint
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    console.log('x-api-key ->', this.configService.get('API_KEY'));
    console.log('x-api-key provided ->', apiKey);

    const canActivate = this.configService.get('API_KEY') === apiKey;
    return canActivate;
  }
}
