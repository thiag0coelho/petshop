import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../Models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);

    return await customer.save();
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'name email document')
      .sort('name')
      .exec();
  }

  async find(document: string): Promise<Customer[]> {
    return await this.model
      .find({ document })
      .populate('user', 'username')
      .exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }
}
