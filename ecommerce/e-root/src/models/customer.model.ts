import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Transaction} from './transaction.model';
import {Cart} from './cart.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @belongsTo(() => Cart)
  cartId: number;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;

@model()
export class CustomerWithPassword extends Customer {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

