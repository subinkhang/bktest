import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Customer} from './customer.model';

@model()
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @hasMany(() => Product)
  products: Product[];

  @property({
    type: 'number',
  })
  productId?: number;

  @belongsTo(() => Customer)
  customerId: number;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
