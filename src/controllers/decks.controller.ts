import {
  CREATE_DECK_RESPONSE,
  DRAW_BY_ID,
  DRAW_DECK_RESPONSE,
  GET_DECK_ID_RESPONSE,
  SHUFFLE_DECK_RESPONSE,
} from '../contracts/DecksContracts';
import {DeckType, DeckTypeWithoutCards} from '../domains/DeckType';
import {
  api,
  get,
  oas,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {CardsType} from '../domains/CardsType';
import {DecksRepository} from '../repositories';
import {repository} from '@loopback/repository';

@api({basePath: '/api/v1'})
@oas.tags('Decks')
export class DecksController {
  constructor(
    @repository(DecksRepository) public decksRepository: DecksRepository,
  ) {}

  @post('/decks')
  @response(200, CREATE_DECK_RESPONSE)
  async create(): Promise<DeckTypeWithoutCards> {
    return this.decksRepository.create();
  }

  @get('/decks/{id}')
  @response(200, GET_DECK_ID_RESPONSE)
  async findById(@param.path.string('id') id: string): Promise<DeckType> {
    return this.decksRepository.getDeckById(id);
  }

  @post('/decks/{id}/draw')
  @response(200, DRAW_DECK_RESPONSE)
  async drawById(
    @requestBody(DRAW_BY_ID) body: {count: number},
    @param.path.string('id') id: string,
  ): Promise<{cards: CardsType[]}> {
    return this.decksRepository.drawById(id, body.count);
  }

  @patch('/decks/{id}/shuffle')
  @response(204, SHUFFLE_DECK_RESPONSE)
  async shuffleById(@param.path.string('id') id: string): Promise<void> {
    await this.decksRepository.shuffleById(id);
  }
}
