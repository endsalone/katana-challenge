import {DecksCard} from '../../domains/DecksCard';
import assert from 'assert';
import {v4 as uuid} from 'uuid';

describe('Decks', () => {
  let id: string;
  let decksCard: DecksCard;

  beforeEach('setupApplication', async () => {
    id = uuid();
    decksCard = new DecksCard(id);
  });

  it('it must create the deck', async () => {
    assert.strictEqual(decksCard.deck.shuffled, false);
    assert.strictEqual(decksCard.deck.remaining, 52);
  });

  it('it must draw two cards from the deck', async () => {
    decksCard.drawCards(2);
    assert.strictEqual(decksCard.deck.remaining, 50);

    decksCard.deck.cards.map(item => {
      assert.notStrictEqual(item, null);
    });
  });

  it('it must shuffle the cards', async () => {
    decksCard.shuffle();
    assert.strictEqual(decksCard.deck.shuffled, true);
  });

  it('it must throw some error when draw exceeds the limit', async () => {
    assert.throws(() => decksCard.drawCards(53), Error);
  });
});
