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
  Admin,
  Agency,
} from '../models';
import {AdminRepository} from '../repositories';

export class AdminAgencyController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
  ) { }

  @get('/admins/{id}/agencies', {
    responses: {
      '200': {
        description: 'Array of Admin has many Agency',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Agency)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Agency>,
  ): Promise<Agency[]> {
    return this.adminRepository.agencies(id).find(filter);
  }

  @post('/admins/{id}/agencies', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Agency)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Admin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {
            title: 'NewAgencyInAdmin',
            exclude: ['id'],
            optional: ['adminId']
          }),
        },
      },
    }) agency: Omit<Agency, 'id'>,
  ): Promise<Agency> {
    return this.adminRepository.agencies(id).create(agency);
  }

  @patch('/admins/{id}/agencies', {
    responses: {
      '200': {
        description: 'Admin.Agency PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {partial: true}),
        },
      },
    })
    agency: Partial<Agency>,
    @param.query.object('where', getWhereSchemaFor(Agency)) where?: Where<Agency>,
  ): Promise<Count> {
    return this.adminRepository.agencies(id).patch(agency, where);
  }

  @del('/admins/{id}/agencies', {
    responses: {
      '200': {
        description: 'Admin.Agency DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Agency)) where?: Where<Agency>,
  ): Promise<Count> {
    return this.adminRepository.agencies(id).delete(where);
  }
}
