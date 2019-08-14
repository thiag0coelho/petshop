import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreditCard } from '../Models/credit-card.model';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async create(@Body() model: CreateCustomerDto) {
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
        new Result(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível atualizar seus dados', false, null, error),
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

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createBilling(@Param('document') document, @Body() model: CreditCard) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar ', false, model, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
