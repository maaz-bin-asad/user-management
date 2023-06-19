import { Controller, Get } from '@nestjs/common';

@Controller('user/v1')
export class UserController {
  @Get('getUser')
  findAll(): string[] {
    return null;
  }
}
