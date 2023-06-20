import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserTypeEnum } from '../enums/user-type.enum';

@Controller('user/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async findUser(@Request() req): Promise<any> {
    const doesUserExists = await this.userService.checkUserAlreadyExists(
      req.user.profile.email,
    );
    if (!doesUserExists) {
      throw new BadRequestException('Given user does not exist');
    }
    if (
      req.user.profile.user_type === UserTypeEnum.ADMIN ||
      req.user.profile.user_type === UserTypeEnum.SUPER_ADMIN
    ) {
      throw new BadRequestException(
        'Cannot get profile for admin and super admin',
      );
    }
    return req.user;
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

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @UsePipes(ValidationPipe)
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.user.profile.email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  @UsePipes(ValidationPipe)
  delete(@Headers('authorization') accessToken: string, @Request() req) {
    return this.userService.deleteUser(req.user.profile.email, accessToken);
  }
}
