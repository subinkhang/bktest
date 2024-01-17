import {Entity, model, property, hasMany} from '@loopback/repository';
import {Admin} from './admin.model';
import {Product} from './product.model';
import {Transaction} from './transaction.model';

@model()
export class Agency extends Entity {
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
  email?: string;

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
  password?: string;


  @property({
    type: 'number',
  })
  adminId?: number;


  // @hasMany(() => Admin)
  // admins: Admin[];
  @hasMany(() => Admin)
  admins: Admin[];
  @hasMany(() => Product)
  products: Product[];

  @hasMany(() => Transaction)
  transactions: Transaction[];

  constructor(data?: Partial<Agency>) {
    super(data);
  }
}

export interface AgencyRelations {
  // describe navigational properties here
}

export type AgencyWithRelations = Agency & AgencyRelations;
