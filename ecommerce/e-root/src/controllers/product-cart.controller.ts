import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  Cart,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductCartController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/carts', {
    responses: {
      '200': {
        description: 'Array of Product has many Cart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cart)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.productRepository.carts(id).find(filter);
  }

  @post('/products/{id}/carts', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cart)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) cart: Omit<Cart, 'id'>,
  ): Promise<Cart> {
    return this.productRepository.carts(id).create(cart);
  }

  @patch('/products/{id}/carts', {
    responses: {
      '200': {
        description: 'Product.Cart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Partial<Cart>,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.productRepository.carts(id).patch(cart, where);
  }

  @del('/products/{id}/carts', {
    responses: {
      '200': {
        description: 'Product.Cart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.productRepository.carts(id).delete(where);
  }
}
