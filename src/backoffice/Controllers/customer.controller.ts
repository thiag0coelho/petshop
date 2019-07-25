import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contracts';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    const user = await this.accountService.create(
      new User(model.document, model.password, true),
    );

    return new Result('Client created', true, user, null);
  }

  @Put(':document')
  put(@Param(':document') document, @Body() body) {
    return new Result('Client updated', true, body, null);
  }

  @Delete()
  delete() {
    return 'Remove client';
  }
}
