import {DeckType, DeckTypeWithoutCards} from './DeckType';
import {CardsType} from './CardsType';
import {InvalidParam} from '../exceptions/InvalidParam';
import {SuitsEnum} from './SuitsEnum';
import {ValuesEnum} from './ValuesEnum';

export class DecksCard {
  public deck: DeckType;

  constructor(id: string, deck?: DeckType) {
    this.deck = this.makeDeck(id, deck);
  }

  protected makeCards(): CardsType[] {
    const cards: CardsType[] = [];

    for (const suitEnum in SuitsEnum) {
      const suit: SuitsEnum = SuitsEnum[suitEnum as keyof typeof SuitsEnum];
      for (const valueEnum in ValuesEnum) {
        const value: ValuesEnum =
          ValuesEnum[valueEnum as keyof typeof ValuesEnum];
        cards.push({
          value,
          suit,
          code: value.charAt(0) + suit.charAt(0),
        });
      }
    }

    return cards;
  }

  protected makeDeck(id: string, existentDeck?: DeckType): DeckType {
    if (existentDeck) {
      this.deck = existentDeck;
      return this.deck;
    }

    const cards: CardsType[] = this.makeCards();
    return {
      deck_id: id,
      shuffled: false,
      remaining: cards.length,
      cards,
    };
  }

  public getDecksCardWithoutCards(): DeckTypeWithoutCards {
    return {
      deck_id: this.deck.deck_id,
      shuffled: this.deck.shuffled,
      remaining: this.deck.remaining,
    };
  }

  public drawCards(count: number): CardsType[] {
    if (count > this.deck.cards.length) {
      throw new InvalidParam(
        `Count must be less than ${this.deck.cards.length}`,
      );
    }

    const drewCards: CardsType[] = [];

    while (count > 0) {
      const toRemove: number = parseInt(
        (Math.random() * (this.deck.cards.length - count) + count - 1).toFixed(
          0,
        ),
      );

      drewCards.push(this.deck.cards[toRemove]);

      this.deck.cards = this.deck.cards.filter(
        (value, index) => index !== toRemove,
      );
      count--;
    }

    this.deck.remaining = this.deck.cards.length;

    return drewCards;
  }

  public shuffle() {
    this.deck.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    this.deck.shuffled = true;
  }
}
