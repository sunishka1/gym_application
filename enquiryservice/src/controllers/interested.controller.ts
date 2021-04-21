import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PotentialUsersInfo} from '../models';
import {PotentialUsersInfoRepository} from '../repositories';

export class InterestedController {
  constructor(
    @repository(PotentialUsersInfoRepository)
    public potentialUsersInfoRepository : PotentialUsersInfoRepository,
  ) {}

  @post('/potential-users-infos')
  @response(200, {
    description: 'PotentialUsersInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(PotentialUsersInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PotentialUsersInfo, {
            title: 'NewPotentialUsersInfo',
            
          }),
        },
      },
    })
    potentialUsersInfo: PotentialUsersInfo,
  ): Promise<PotentialUsersInfo> {
    return this.potentialUsersInfoRepository.create(potentialUsersInfo);
  }

  @get('/potential-users-infos/count')
  @response(200, {
    description: 'PotentialUsersInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PotentialUsersInfo) where?: Where<PotentialUsersInfo>,
  ): Promise<Count> {
    return this.potentialUsersInfoRepository.count(where);
  }

  @get('/potential-users-infos')
  @response(200, {
    description: 'Array of PotentialUsersInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PotentialUsersInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PotentialUsersInfo) filter?: Filter<PotentialUsersInfo>,
  ): Promise<PotentialUsersInfo[]> {
    return this.potentialUsersInfoRepository.find(filter);
  }

  @patch('/potential-users-infos')
  @response(200, {
    description: 'PotentialUsersInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PotentialUsersInfo, {partial: true}),
        },
      },
    })
    potentialUsersInfo: PotentialUsersInfo,
    @param.where(PotentialUsersInfo) where?: Where<PotentialUsersInfo>,
  ): Promise<Count> {
    return this.potentialUsersInfoRepository.updateAll(potentialUsersInfo, where);
  }

  @get('/potential-users-infos/{id}')
  @response(200, {
    description: 'PotentialUsersInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PotentialUsersInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PotentialUsersInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<PotentialUsersInfo>
  ): Promise<PotentialUsersInfo> {
    return this.potentialUsersInfoRepository.findById(id, filter);
  }

  @patch('/potential-users-infos/{id}')
  @response(204, {
    description: 'PotentialUsersInfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PotentialUsersInfo, {partial: true}),
        },
      },
    })
    potentialUsersInfo: PotentialUsersInfo,
  ): Promise<void> {
    await this.potentialUsersInfoRepository.updateById(id, potentialUsersInfo);
  }

  @put('/potential-users-infos/{id}')
  @response(204, {
    description: 'PotentialUsersInfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() potentialUsersInfo: PotentialUsersInfo,
  ): Promise<void> {
    await this.potentialUsersInfoRepository.replaceById(id, potentialUsersInfo);
  }

  @del('/potential-users-infos/{id}')
  @response(204, {
    description: 'PotentialUsersInfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.potentialUsersInfoRepository.deleteById(id);
  }
}
