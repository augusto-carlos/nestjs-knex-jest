import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
  transform(value: string) {
    console.log('REQ/RES LIFE CYCLE -> PIPES');
    if (!isUUID(value, 4)) {
      throw new BadRequestException('Id inválido');
    }
    return value;
  }
}
