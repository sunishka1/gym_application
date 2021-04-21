import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'interestedUsers',
  connector: 'postgresql',
  url: 'postgres://postgres:myPassword@localhost/enquirydb',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class InterestedUsersDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'interestedUsers';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.interestedUsers', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
