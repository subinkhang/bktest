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
  Agency,
  Transaction,
} from '../models';
import {AgencyRepository} from '../repositories';

export class AgencyTransactionController {
  constructor(
    @repository(AgencyRepository) protected agencyRepository: AgencyRepository,
  ) { }

  @get('/agencies/{id}/transactions', {
    responses: {
      '200': {
        description: 'Array of Agency has many Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    return this.agencyRepository.transactions(id).find(filter);
  }

  @post('/agencies/{id}/transactions', {
    responses: {
      '200': {
        description: 'Agency model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Agency.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransactionInAgency',
            exclude: ['id'],
            optional: ['agencyId']
          }),
        },
      },
    }) transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    return this.agencyRepository.transactions(id).create(transaction);
  }

  @patch('/agencies/{id}/transactions', {
    responses: {
      '200': {
        description: 'Agency.Transaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Partial<Transaction>,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.agencyRepository.transactions(id).patch(transaction, where);
  }

  @del('/agencies/{id}/transactions', {
    responses: {
      '200': {
        description: 'Agency.Transaction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.agencyRepository.transactions(id).delete(where);
  }
}
