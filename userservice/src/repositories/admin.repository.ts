import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdmininfoDataSource} from '../datasources';
import {Admin, AdminRelations} from '../models';
import * as jwt from 'jsonwebtoken';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.adminid,
  AdminRelations
> {
  constructor(
    @inject('datasources.admininfo') dataSource: AdmininfoDataSource,
  ) {
    super(Admin, dataSource);
  }

  async isUserExist(user:Admin){
    const checkedUser=await this.find({
      where:{
        username:user.username
      }
    });
    
    return checkedUser;
  }

  async verifyToken(token:any)
  {
    return jwt.verify(token,"101703571");
  }
}
