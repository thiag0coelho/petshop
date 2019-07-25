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

@Controller('v1/customers')
export class CustomerController {
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
  post(@Body() body: CreateCustomerDto) {
    return new Result('Client created', true, body, null);
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
