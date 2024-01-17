import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Customer} from './customer.model';
import {Agency} from './agency.model';
import {Product} from './product.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @belongsTo(() => Customer)
  customerId: number;

  @belongsTo(() => Agency)
  agencyId: number;

  @hasMany(() => Product)
  products: Product[];

  @property({
    type: 'number',
  })
  productId?: number;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
