import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message(validationArguments) {
      return `${validationArguments.property}: ${validationArguments.value} (${typeof validationArguments.value}) - este campo deve ser do tipo string.`;
    },
  })
  name: string;

  @IsNotEmpty({ message: 'Age should not be empty' })
  @IsPositive()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
