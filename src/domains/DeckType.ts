import {CardsType} from './CardsType';

export type DeckType = {
  deck_id: string;
  shuffled: boolean;
  remaining: number;
  cards: CardsType[];
};

export type DeckTypeWithoutCards = Omit<DeckType, 'cards'>;
