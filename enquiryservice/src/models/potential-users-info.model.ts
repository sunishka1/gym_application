import {Entity, model, property} from '@loopback/repository';

@model()
export class PotentialUsersInfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ticketid?: number;

  @property({
    type: 'string',
    required: true,
  })
  CustomerName: string;

  @property({
    type: 'number',
    required: true,
  })
  CustomerPhone: number;

  @property({
    type: 'boolean',
    required: true,
  })
  OpenTicket: boolean;


  constructor(data?: Partial<PotentialUsersInfo>) {
    super(data);
  }
}

export interface PotentialUsersInfoRelations {
  // describe navigational properties here
}

export type PotentialUsersInfoWithRelations = PotentialUsersInfo & PotentialUsersInfoRelations;
