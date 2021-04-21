import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PackagedbDataSource} from '../datasources';
import {Packageinfo, PackageinfoRelations} from '../models';

export class PackageinfoRepository extends DefaultCrudRepository<
  Packageinfo,
  typeof Packageinfo.prototype.packageid,
  PackageinfoRelations
> {
  constructor(
    @inject('datasources.packagedb') dataSource: PackagedbDataSource,
  ) {
    super(Packageinfo, dataSource);
  }
}
