import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cart,
  Customer,
} from '../models';
import {CartRepository} from '../repositories';

export class CartCustomerController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Cart',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Cart.prototype.id,
  ): Promise<Customer> {
    return this.cartRepository.customer(id);
  }
}
