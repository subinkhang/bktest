import {Entity, model, property, hasMany} from '@loopback/repository';
import {Agency} from './agency.model';

@model()
export class Admin extends Entity {
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

  @hasMany(() => Agency)
  agencies: Agency[];

  @property({
    type: 'number',
  })
  agencyId?: number;
  // @property({
  //   type: 'number',
  // })
  // agenciesId?: number;

  // @hasMany(() => Agency)
  // agencies: Agency[];

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
