import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaction,
  Customer,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionCustomerController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Transaction',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Transaction.prototype.id,
  ): Promise<Customer> {
    return this.transactionRepository.customer(id);
  }
}
