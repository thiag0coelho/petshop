import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { CreditCard } from 'src/modules/backoffice/Models/credit-card.model';

export class CreateCreditCardContract implements Contract {
  errors: any[];
  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Nome do cartão inválido');
    flunt.isFixedLen(model.number, 16, 'Número de cartão inválido');
    flunt.isFixedLen(
      model.expiration,
      4,
      'Data de expiração do cartão inválido',
    );

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
