import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Customer,
  Cart,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCartController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/cart', {
    responses: {
      '200': {
        description: 'Cart belonging to Customer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cart),
          },
        },
      },
    },
  })
  async getCart(
    @param.path.number('id') id: typeof Customer.prototype.id,
  ): Promise<Cart> {
    return this.customerRepository.cart(id);
  }
}
