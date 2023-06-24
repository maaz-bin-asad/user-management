import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
