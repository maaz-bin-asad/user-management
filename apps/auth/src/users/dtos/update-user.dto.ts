import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

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
}
