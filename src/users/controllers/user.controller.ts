import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('user/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  findAll(): string[] {
    return null;
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }
}
