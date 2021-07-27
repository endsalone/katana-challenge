import {Client} from '@loopback/testlab';
import {KatanaChallengeApplication} from '../..';
import assert from 'assert';
import {setupApplication} from './test-helper';
import {v4 as uuid} from 'uuid';

describe('DecksController', () => {
  let app: KatanaChallengeApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('must create a deck successfully', async () => {
    const res = await client.post('/api/v1/decks').expect(200);

    assert.deepStrictEqual(Object.keys(res.body), [
      'deck_id',
      'shuffled',
      'remaining',
    ]);
    assert.strictEqual(res.body.remaining, 52);
  });

  it('must open the deck successfully', async () => {
    const createdDeck = await client.post('/api/v1/decks').expect(200);
    const id: string = createdDeck.body.deck_id;

    const getCreatedDeck = await client.get(`/api/v1/decks/${id}`).expect(200);
    assert.deepStrictEqual(Object.keys(getCreatedDeck.body), [
      'deck_id',
      'shuffled',
      'remaining',
      'cards',
    ]);
    assert.strictEqual(getCreatedDeck.body.remaining, 52);
  });

  it('must shuffle the deck successfully', async () => {
    const createdDeck = await client.post('/api/v1/decks').expect(200);
    const id: string = createdDeck.body.deck_id;

    await client.patch(`/api/v1/decks/${id}/shuffle`).expect(204);

    const getCreatedDeck = await client.get(`/api/v1/decks/${id}`).expect(200);
    assert.strictEqual(getCreatedDeck.body.shuffled, true);
  });

  it('must draw the deck successfully', async () => {
    const createdDeck = await client.post('/api/v1/decks').expect(200);
    const id: string = createdDeck.body.deck_id;

    const drawDeck = await client
      .post(`/api/v1/decks/${id}/draw`)
      .send({count: 2})
      .expect(200);

    assert.deepStrictEqual(Object.keys(drawDeck.body.cards).length, 2);
  });

  it('must return 404 when try to get non-existent deck', async () => {
    const id: string = uuid();

    const nonExistentDeck = await client.get(`/api/v1/decks/${id}`).expect(404);
    assert.strictEqual(nonExistentDeck.body.error.message, 'Deck not found');
    assert.deepStrictEqual(nonExistentDeck.body.error, {
      statusCode: 404,
      name: 'Error',
      message: 'Deck not found',
    });
  });

  it('must return 404 when try to shuffle non-existent deck', async () => {
    const id: string = uuid();

    const nonExistentDeck = await client
      .patch(`/api/v1/decks/${id}/shuffle`)
      .expect(404);
    assert.strictEqual(nonExistentDeck.body.error.message, 'Deck not found');
    assert.deepStrictEqual(nonExistentDeck.body.error, {
      statusCode: 404,
      name: 'Error',
      message: 'Deck not found',
    });
  });

  it("must return 400 when try to draw more cards than the deck's limit", async () => {
    const createdDeck = await client.post('/api/v1/decks').expect(200);
    const id: string = createdDeck.body.deck_id;

    const invalidDraw = await client
      .post(`/api/v1/decks/${id}/draw`)
      .send({count: 60})
      .expect(400);

    assert.strictEqual(
      invalidDraw.body.error.message,
      'Count must be less than 52',
    );
    assert.deepStrictEqual(invalidDraw.body.error, {
      statusCode: 400,
      name: 'Error',
      message: 'Count must be less than 52',
    });
  });
});
