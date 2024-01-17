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
  Admin,
} from '../models';
import {AgencyRepository} from '../repositories';

export class AgencyAdminController {
  constructor(
    @repository(AgencyRepository) protected agencyRepository: AgencyRepository,
  ) { }

  @get('/agencies/{id}/admins', {
    responses: {
      '200': {
        description: 'Array of Agency has many Admin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Admin)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Admin>,
  ): Promise<Admin[]> {
    return this.agencyRepository.admins(id).find(filter);
  }

  @post('/agencies/{id}/admins', {
    responses: {
      '200': {
        description: 'Agency model instance',
        content: {'application/json': {schema: getModelSchemaRef(Admin)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Agency.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewAdminInAgency',
            exclude: ['id'],
            optional: ['agencyId']
          }),
        },
      },
    }) admin: Omit<Admin, 'id'>,
  ): Promise<Admin> {
    return this.agencyRepository.admins(id).create(admin);
  }

  @patch('/agencies/{id}/admins', {
    responses: {
      '200': {
        description: 'Agency.Admin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {partial: true}),
        },
      },
    })
    admin: Partial<Admin>,
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return this.agencyRepository.admins(id).patch(admin, where);
  }

  @del('/agencies/{id}/admins', {
    responses: {
      '200': {
        description: 'Agency.Admin DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return this.agencyRepository.admins(id).delete(where);
  }
}
