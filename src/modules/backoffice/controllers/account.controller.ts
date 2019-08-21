import {
  Controller,
  UseGuards,
  Get,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../shared/services/auth.service';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('')
  @UseGuards()
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }
}
