import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { Pet } from '../models/pet.model';
import { QueryDto } from '../dtos/query.dto';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async createCustomer(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        null,
        null,
        null,
        null,
        user,
      );
      const res = await this.customerService.create(customer);

      return new Result('Client created', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Something went wrong', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();

    return new Result(null, true, customers, null);
  }

  @Get(':document')
  async get(@Param('document') document: string) {
    const customer = await this.customerService.find(document);

    return new Result(null, true, customer, null);
  }

  @Post('query')
  async query(@Body() model: QueryDto) {
    const customers = await this.customerService.query(model);
    return new Result(null, true, customers, null);
  }
}
