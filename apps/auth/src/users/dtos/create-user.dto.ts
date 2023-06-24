import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { UserTypeEnum } from '../enums/user-type.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  address: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsEnum(UserTypeEnum)
  user_type: string;
}
