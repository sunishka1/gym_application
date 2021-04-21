import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InterestedUsersDataSource} from '../datasources';
import {PotentialUsersInfo, PotentialUsersInfoRelations} from '../models';

export class PotentialUsersInfoRepository extends DefaultCrudRepository<
  PotentialUsersInfo,
  typeof PotentialUsersInfo.prototype.ticketid,
  PotentialUsersInfoRelations
> {
  constructor(
    @inject('datasources.interestedUsers') dataSource: InterestedUsersDataSource,
  ) {
    super(PotentialUsersInfo, dataSource);
  }
}
