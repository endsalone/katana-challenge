import {Entity, model, property} from '@loopback/repository';
import {DecksCard} from '../domains/DecksCard';

@model({settings: {strict: false}})
export class Decks extends Entity {
  @property()
  value: DecksCard;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Decks>) {
    super(data);
  }
}

export interface DecksRelations {
  // describe navigational properties here
}

export type DecksWithRelations = Decks & DecksRelations;
