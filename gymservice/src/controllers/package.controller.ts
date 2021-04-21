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
import {Packageinfo} from '../models';
import {PackageinfoRepository} from '../repositories';

export class PackageController {
  constructor(
    @repository(PackageinfoRepository)
    public packageinfoRepository : PackageinfoRepository,
  ) {}

  @post('/packageinfos')
  @response(200, {
    description: 'Packageinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Packageinfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packageinfo, {
            title: 'NewPackageinfo',
            
          }),
        },
      },
    })
    packageinfo: Packageinfo,
  ): Promise<Packageinfo> {
    return this.packageinfoRepository.create(packageinfo);
  }

  @get('/packageinfos/count')
  @response(200, {
    description: 'Packageinfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Packageinfo) where?: Where<Packageinfo>,
  ): Promise<Count> {
    return this.packageinfoRepository.count(where);
  }

  @get('/packageinfos')
  @response(200, {
    description: 'Array of Packageinfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Packageinfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Packageinfo) filter?: Filter<Packageinfo>,
  ): Promise<Packageinfo[]> {
    return this.packageinfoRepository.find(filter);
  }

  @patch('/packageinfos')
  @response(200, {
    description: 'Packageinfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packageinfo, {partial: true}),
        },
      },
    })
    packageinfo: Packageinfo,
    @param.where(Packageinfo) where?: Where<Packageinfo>,
  ): Promise<Count> {
    return this.packageinfoRepository.updateAll(packageinfo, where);
  }

  @get('/packageinfos/{id}')
  @response(200, {
    description: 'Packageinfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Packageinfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Packageinfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Packageinfo>
  ): Promise<Packageinfo> {
    return this.packageinfoRepository.findById(id, filter);
  }

  @patch('/packageinfos/{id}')
  @response(204, {
    description: 'Packageinfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Packageinfo, {partial: true}),
        },
      },
    })
    packageinfo: Packageinfo,
  ): Promise<void> {
    await this.packageinfoRepository.updateById(id, packageinfo);
  }

  @put('/packageinfos/{id}')
  @response(204, {
    description: 'Packageinfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() packageinfo: Packageinfo,
  ): Promise<void> {
    await this.packageinfoRepository.replaceById(id, packageinfo);
  }

  @del('/packageinfos/{id}')
  @response(204, {
    description: 'Packageinfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.packageinfoRepository.deleteById(id);
  }
}
