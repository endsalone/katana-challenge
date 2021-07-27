import {DeckType, DeckTypeWithoutCards} from '../domains/DeckType';
import {CardsType} from '../domains/CardsType';
import {Decks} from '../models';
import {DecksCard} from '../domains/DecksCard';
import {DefaultKeyValueRepository} from '@loopback/repository';
import {MemoryDataSource} from '../datasources';
import {NotFound} from '../exceptions/NotFound';
import {inject} from '@loopback/core';
import {v4 as uuid} from 'uuid';

export class DecksRepository extends DefaultKeyValueRepository<Decks> {
  constructor(
    @inject('datasources.memory')
    dataSource: MemoryDataSource,
  ) {
    super(Decks, dataSource);
  }

  async create(): Promise<DeckTypeWithoutCards> {
    const id: string = uuid();
    const decks: Decks = new Decks();
    decks.value = new DecksCard(id);

    await this.set(id, decks);
    await this.get(id);

    return decks.value.getDecksCardWithoutCards();
  }

  async findById(id: string): Promise<Decks> {
    const decks: Decks = await this.get(id);
    if (!decks) {
      throw new NotFound('Deck not found');
    }
    return decks;
  }

  async getDeckById(id: string): Promise<DeckType> {
    const decks: Decks = await this.findById(id);
    return decks.value.deck;
  }

  async drawById(id: string, count: number): Promise<{cards: CardsType[]}> {
    const decks: Decks = await this.findById(id);
    decks.value = new DecksCard(id, decks.value.deck);
    const drawCards: CardsType[] = decks.value.drawCards(count);
    await this.set(id, decks);
    return {cards: drawCards};
  }

  async shuffleById(id: string): Promise<void> {
    const decks: Decks = await this.findById(id);
    decks.value = new DecksCard(id, decks.value.deck);
    decks.value.shuffle();
    await this.set(id, decks);
  }
}
