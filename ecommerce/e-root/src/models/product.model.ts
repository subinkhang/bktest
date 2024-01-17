import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Agency} from './agency.model';
import {Transaction} from './transaction.model';
import {Cart} from './cart.model';

@model()
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @belongsTo(() => Agency)
  agencyId: number;

  @property({
    type: 'number',
  })
  transactionId?: number;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @property({
    type: 'number',
  })
  cartId?: number;

  @hasMany(() => Cart)
  carts: Cart[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
