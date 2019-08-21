import {
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../../shared/services/auth.service';
import { JwtAuthGuard } from '../../../shared/guards/auth.guard';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return [];
  }
}
