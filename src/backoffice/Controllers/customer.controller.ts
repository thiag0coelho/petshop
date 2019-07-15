import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Customer } from 'dist/backoffice/Models/customer.model';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return 'Get clients';
  }

  @Get(':document')
  getById(@Param('document') document) {
    return 'Get client ' + document;
  }

  @Post()
  post(@Body() body: Customer) {
    return body;
  }

  @Put(':document')
  put(@Param(':document') document, @Body() body) {
    return {
      customer: document,
      data: body,
    };
  }

  @Delete()
  delete() {
    return 'Remove client';
  }
}
