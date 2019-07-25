import { Contract } from '../contract';
import { Flunt } from '../../../utils/flunt';
import { Address } from '../../models/address.model';

export class CreateAddressContract implements Contract {
  errors: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'Invalid CEP');
    flunt.hasMinLen(model.street, 6, 'Invalid street');
    flunt.hasMinLen(model.neighborhood, 6, 'Invalid neighborhood');
    flunt.hasMinLen(model.city, 6, 'Invalid city');
    flunt.isFixedLen(model.state, 2, 'Invalid state');
    flunt.isFixedLen(model.country, 3, 'Invalid country');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
