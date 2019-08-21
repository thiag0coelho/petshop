import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from '../../../../utils/flunt';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';

export class UpdateCustomerContract implements Contract {
  errors: any[];
  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Invalid name');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
