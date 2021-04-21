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
import {MarkTeam} from '../models';
import {MarkTeamRepository} from '../repositories';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {inject} from '@loopback/core';
import {Request, RestBindings} from '@loopback/rest';

export class MarkTeamController {
  constructor(
    @repository(MarkTeamRepository)
    public markTeamRepository : MarkTeamRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  // SignUp
  @post('/mark-team/signup')
  @response(200, {
    description: 'User Model instance',
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {
            title: 'NewUser',
            exclude: ['teamid'],
          }),
        },
      },
    })
    user: Omit<MarkTeam, 'id'>,
  ): Promise<MarkTeam | String> {
    const checkedUser = await this.markTeamRepository.isUserExist(user);
    if (checkedUser.length) {
      return 'User Already Exist';
    } else {
      user.password = bcrypt.hashSync(user.password, 8);
      return this.markTeamRepository.create(user);
    }
  }

  // Login
  @post('/mark-team/login')
  @response(200, {
    description: 'User Login',
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {
            title: 'NewUser',
            exclude: ['teamid'],
          }),
        },
      },
    })
    user: Omit<MarkTeam, 'id'>,
  ): Promise< Object | String> {
    const isUserExist = await this.markTeamRepository.isUserExist(user);
    if (isUserExist.length) {
      const isPassValid = bcrypt.compareSync(
        user.password,
        isUserExist[0].password,
      );
      if (isPassValid) {
        let token = jwt.sign({id: user.username}, '101703571', {expiresIn: 84600});
        return {token:token};
      }
      return 'Password is Invalid';
    } else {
      return 'Invalid User';
    }
  }


  // Token Verify

  @post('/mark-team/verify')
  @response(200,{
    description:"Token Verification"
  })
  async verify()
  :Promise<Object |String>
  {
    const header=this.request.headers;
    try{
      await this.markTeamRepository.verifyToken(header.authorization);
    }
    catch(err)
    {
      return {verified: false,error:err};
    }
    return {verified : true};
  }

  @post('/mark-teams')
  @response(200, {
    description: 'MarkTeam model instance',
    content: {'application/json': {schema: getModelSchemaRef(MarkTeam)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {
            title: 'NewMarkTeam',
            exclude: ['teamid'],
          }),
        },
      },
    })
    markTeam: Omit<MarkTeam, 'teamid'>,
  ): Promise<MarkTeam> {
    return this.markTeamRepository.create(markTeam);
  }

  @get('/mark-teams/count')
  @response(200, {
    description: 'MarkTeam model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MarkTeam) where?: Where<MarkTeam>,
  ): Promise<Count> {
    return this.markTeamRepository.count(where);
  }

  @get('/mark-teams')
  @response(200, {
    description: 'Array of MarkTeam model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MarkTeam, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MarkTeam) filter?: Filter<MarkTeam>,
  ): Promise<MarkTeam[]> {
    return this.markTeamRepository.find(filter);
  }

  @patch('/mark-teams')
  @response(200, {
    description: 'MarkTeam PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {partial: true}),
        },
      },
    })
    markTeam: MarkTeam,
    @param.where(MarkTeam) where?: Where<MarkTeam>,
  ): Promise<Count> {
    return this.markTeamRepository.updateAll(markTeam, where);
  }

  @get('/mark-teams/{id}')
  @response(200, {
    description: 'MarkTeam model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MarkTeam, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MarkTeam, {exclude: 'where'}) filter?: FilterExcludingWhere<MarkTeam>
  ): Promise<MarkTeam> {
    return this.markTeamRepository.findById(id, filter);
  }

  @patch('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarkTeam, {partial: true}),
        },
      },
    })
    markTeam: MarkTeam,
  ): Promise<void> {
    await this.markTeamRepository.updateById(id, markTeam);
  }

  @put('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() markTeam: MarkTeam,
  ): Promise<void> {
    await this.markTeamRepository.replaceById(id, markTeam);
  }

  @del('/mark-teams/{id}')
  @response(204, {
    description: 'MarkTeam DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.markTeamRepository.deleteById(id);
  }
}
