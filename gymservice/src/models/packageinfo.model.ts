import {Entity, model, property} from '@loopback/repository';

@model()
export class Packageinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  packageid?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  duration: string;


  constructor(data?: Partial<Packageinfo>) {
    super(data);
  }
}

export interface PackageinfoRelations {
  // describe navigational properties here
}

export type PackageinfoWithRelations = Packageinfo & PackageinfoRelations;
