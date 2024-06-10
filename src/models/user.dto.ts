import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
