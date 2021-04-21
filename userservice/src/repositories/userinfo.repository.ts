import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { JsonWebTokenError } from 'jsonwebtoken';
import {UserdbDataSource} from '../datasources';
import {Userinfo, UserinfoRelations} from '../models';
import * as jwt from 'jsonwebtoken';

export class UserinfoRepository extends DefaultCrudRepository<
  Userinfo,
  typeof Userinfo.prototype.userid,
  UserinfoRelations
> {
  constructor(
    @inject('datasources.customers') dataSource: UserdbDataSource,
  ) {
    super(Userinfo, dataSource);
  }
  async isUserExist(user: Userinfo) {
    let alreadyExistingUser = await this.find({
      where: {
        username: user.username
      }
    });
    // if (alreadyExistingUser.length > 0) {
    return alreadyExistingUser;
    // }
  }

  async verifyToken(token:any){
    return jwt.verify(token,'101703571');
  }

}
