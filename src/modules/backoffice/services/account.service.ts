import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../Models/user.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);

    return await user.save();
  }

  async findOneByUsername(username: string) {
    return new User(username, '123456789', true);
  }
}
