import { Contract } from './contract';
import { Customer } from '../models/customer.model';
import { Flunt } from '../../utils/flunt';

export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: Customer): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Invalid name');
    flunt.isEmail(model.email, 'Invalid email');
    flunt.isFixedLen(model.document, 11, 'Invalid CPF');
    flunt.hasMinLen(model.password, 6, 'Invalid password');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
