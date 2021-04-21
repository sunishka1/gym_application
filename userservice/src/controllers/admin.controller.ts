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
import {Admin} from '../models';
import {AdminRepository} from '../repositories';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {inject} from '@loopback/core';
import {Request, RestBindings} from '@loopback/rest';

export class AdminController {
  constructor(
    @repository(AdminRepository)
    public adminRepository : AdminRepository,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  // SignUp
  @post('/admin/signup')
  @response(200, {
    description: 'User Model instance',
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewUser',
            exclude: ['adminid'],
          }),
        },
      },
    })
    user: Omit<Admin, 'id'>,
  ): Promise<Admin | String> {
    const checkedUser = await this.adminRepository.isUserExist(user);
    if (checkedUser.length) {
      return 'User Already Exist';
    } else {
      user.password = bcrypt.hashSync(user.password, 8);
      return this.adminRepository.create(user);
    }
  }

  // Login
  @post('/admin/login')
  @response(200, {
    description: 'admin Login',
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewUser',
            exclude: ['adminid'],
          }),
        },
      },
    })
    user: Omit<Admin, 'id'>,
  ): Promise< Object | String> {
    // console.log("here!");
    
    const isUserExist = await this.adminRepository.isUserExist(user);
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

  @post('/admin/verify')
  @response(200,{
    description:"Token Verification"
  })
  async verify()
  :Promise<Object |String>
  {
    const header=this.request.headers;
    try{
      await this.adminRepository.verifyToken(header.authorization);
    }
    catch(err)
    {
      return {verified: false,error:err};
    }
    return {verified : true};
  }

  @post('/admins')
  @response(200, {
    description: 'Admin model instance',
    content: {'application/json': {schema: getModelSchemaRef(Admin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewAdmin',
            exclude: ['adminid'],
          }),
        },
      },
    })
    admin: Omit<Admin, 'id'>,
  ): Promise<Admin> {
    return this.adminRepository.create(admin);
  }

  @get('/admins/count')
  @response(200, {
    description: 'Admin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Admin) where?: Where<Admin>,
  ): Promise<Count> {
    return this.adminRepository.count(where);
  }

  @get('/admins')
  @response(200, {
    description: 'Array of Admin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Admin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Admin) filter?: Filter<Admin>,
  ): Promise<Admin[]> {
    return this.adminRepository.find(filter);
  }

  @patch('/admins')
  @response(200, {
    description: 'Admin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {partial: true}),
        },
      },
    })
    admin: Admin,
    @param.where(Admin) where?: Where<Admin>,
  ): Promise<Count> {
    return this.adminRepository.updateAll(admin, where);
  }

  @get('/admins/{id}')
  @response(200, {
    description: 'Admin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Admin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: number,
    @param.filter(Admin, {exclude: 'where'}) filter?: FilterExcludingWhere<Admin>
  ): Promise<Admin> {
    return this.adminRepository.findById(id, filter);
  }

  @patch('/admins/{id}')
  @response(204, {
    description: 'Admin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {partial: true}),
        },
      },
    })
    admin: Admin,
  ): Promise<void> {
    await this.adminRepository.updateById(id, admin);
  }

  @put('/admins/{id}')
  @response(204, {
    description: 'Admin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: number,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.replaceById(id, admin);
  }

  @del('/admins/{id}')
  @response(204, {
    description: 'Admin DELETE success',
  })
  async deleteById(@param.path.string('id') id: number): Promise<void> {
    await this.adminRepository.deleteById(id);
  }
}
