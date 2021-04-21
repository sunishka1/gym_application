import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userid?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Userinfo>) {
    super(data);
  }
}

export interface UserinfoRelations {
  // describe navigational properties here
}

export type UserinfoWithRelations = Userinfo & UserinfoRelations;
