import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MarkTeamdbDataSource} from '../datasources';
import {MarkTeam, MarkTeamRelations} from '../models';

import * as jwt from 'jsonwebtoken';

export class MarkTeamRepository extends DefaultCrudRepository<
  MarkTeam,
  typeof MarkTeam.prototype.teamid,
  MarkTeamRelations
> {
  constructor(
    @inject('datasources.markTeamdb') dataSource: MarkTeamdbDataSource,
  ) {
    super(MarkTeam, dataSource);
  }

  async isUserExist(user:MarkTeam){
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
