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
  RestBindings,
} from '@loopback/rest';
import {Request} from '@loopback/rest';
import {Userinfo} from '../models';
import {UserinfoRepository} from '../repositories';

import * as bcrtypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { inject } from '@loopback/context';


export class UserController {
  // request: any;
  constructor(
    @repository(UserinfoRepository)
    public userinfoRepository : UserinfoRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request
  ) {}


  @post('/customer/signup')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userinfo)}},
  })
  async createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {
            title: 'NewUser',
            exclude: ['userid'],
          }),
        },
      },
    })
    user: Omit<Userinfo, 'id'>,
  ): Promise<Userinfo | string> {
    let result = await this.userinfoRepository.isUserExist(user);
    console.log(result);
    if (result.length > 0)
      return "User is Existing";
    else {
      user.password = bcrtypt.hashSync(user.password, 8);
      return this.userinfoRepository.create(user);
    }

  }

  @post('/customer/login')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userinfo)}},
  })
  async login(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userinfo, {
          title: 'NewUser',
          exclude: ['userid'],
        }),
      },
    },
  })
  user: Omit<Userinfo, 'id'>,
  ): Promise<string> {
    let result = await this.userinfoRepository.isUserExist(user);
    if (result.length > 0) {
      let isPasswordValid = bcrtypt.compareSync(user.password, result[0].password);
      console.log(isPasswordValid);
      if (isPasswordValid) {
        let token = jwt.sign({id: result[0].userid}, "101703571", {expiresIn: 84600});
        return token
      }
      return "Password is invalid"
    }
    else {
      return "User does not exist"
    }
  }

  @post('/customer/verify')
  @response(200,{
    description:"Token Verification"
  })
  async verify()
  :Promise<Object | String>
  {
    const header = this.request.headers;
    try{
      await this.userinfoRepository.verifyToken(header.authorization);
    }
    catch(err){
      return {verified:false,error:err};
    }
    return {verified:true};
  }

  @post('/userinfos')
  @response(200, {
    description: 'Userinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userinfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {
            title: 'NewUserinfo',
            
          }),
        },
      },
    })
    userinfo: Userinfo,
  ): Promise<Userinfo> {
    return this.userinfoRepository.create(userinfo);
  }

  @get('/userinfos/count')
  @response(200, {
    description: 'Userinfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Userinfo) where?: Where<Userinfo>,
  ): Promise<Count> {
    return this.userinfoRepository.count(where);
  }

  @get('/userinfos')
  @response(200, {
    description: 'Array of Userinfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Userinfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Userinfo) filter?: Filter<Userinfo>,
  ): Promise<Userinfo[]> {
    return this.userinfoRepository.find(filter);
  }

  @patch('/userinfos')
  @response(200, {
    description: 'Userinfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {partial: true}),
        },
      },
    })
    userinfo: Userinfo,
    @param.where(Userinfo) where?: Where<Userinfo>,
  ): Promise<Count> {
    return this.userinfoRepository.updateAll(userinfo, where);
  }

  @get('/userinfos/{id}')
  @response(200, {
    description: 'Userinfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userinfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Userinfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Userinfo>
  ): Promise<Userinfo> {
    return this.userinfoRepository.findById(id, filter);
  }

  @patch('/userinfos/{id}')
  @response(204, {
    description: 'Userinfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {partial: true}),
        },
      },
    })
    userinfo: Userinfo,
  ): Promise<void> {
    await this.userinfoRepository.updateById(id, userinfo);
  }

  @put('/userinfos/{id}')
  @response(204, {
    description: 'Userinfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userinfo: Userinfo,
  ): Promise<void> {
    await this.userinfoRepository.replaceById(id, userinfo);
  }

  @del('/userinfos/{id}')
  @response(204, {
    description: 'Userinfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userinfoRepository.deleteById(id);
  }
}
