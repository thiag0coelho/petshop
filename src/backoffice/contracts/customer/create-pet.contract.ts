import { Contract } from '../contract';
import { Flunt } from '../../../utils/flunt';
import { Pet } from '../../models/pet.model';

export class CreatePetContract implements Contract {
  errors: any[];
  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 2, 'Invalid name');
    flunt.hasMinLen(model.gender, 3, 'Invalid gender');
    flunt.hasMinLen(model.kind, 3, 'Invalid kind');
    flunt.hasMinLen(model.brand, 3, 'Invalid brand');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
