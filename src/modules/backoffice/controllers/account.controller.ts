import { Controller, UseInterceptors, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/accounts')
export class AccountController {
  constructor() {}

  @Get('')
  @UseGuards()
  @UseInterceptors(AuthGuard())
  findAll() {
    return [];
  }
}
