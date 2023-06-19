import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { UserTypeEnum } from '../enums/user-type.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  @IsOptional()
  phone_number: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsEnum(UserTypeEnum)
  user_type: string;
}
