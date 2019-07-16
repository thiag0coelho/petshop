import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';

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
  post(@Body() body: Customer) {
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
