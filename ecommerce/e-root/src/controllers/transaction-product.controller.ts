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
  Transaction,
  Product,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionProductController {
  constructor(
    @repository(TransactionRepository) protected transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Transaction has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.transactionRepository.products(id).find(filter);
  }

  @post('/transactions/{id}/products', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Transaction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInTransaction',
            exclude: ['id'],
            optional: ['transactionId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.transactionRepository.products(id).create(product);
  }

  @patch('/transactions/{id}/products', {
    responses: {
      '200': {
        description: 'Transaction.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.transactionRepository.products(id).patch(product, where);
  }

  @del('/transactions/{id}/products', {
    responses: {
      '200': {
        description: 'Transaction.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.transactionRepository.products(id).delete(where);
  }
}
