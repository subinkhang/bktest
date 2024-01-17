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
  Agency,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionAgencyController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/agency', {
    responses: {
      '200': {
        description: 'Agency belonging to Transaction',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Agency),
          },
        },
      },
    },
  })
  async getAgency(
    @param.path.number('id') id: typeof Transaction.prototype.id,
  ): Promise<Agency> {
    return this.transactionRepository.agency(id);
  }
}
