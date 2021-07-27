import {RequestBodyObject} from '@loopback/openapi-v3/src/types';
import {ResponseObject} from '@loopback/rest';

export const CREATE_DECK_RESPONSE: ResponseObject = {
  description: 'Create a Deck',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'CreateDeckResponse',
        properties: {
          deck_id: {type: 'string'},
          shuffled: {type: 'boolean'},
          remaining: {type: 'number'},
        },
      },
    },
  },
};
export const GET_DECK_ID_RESPONSE: ResponseObject = {
  description: 'Open a Deck',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'GetDeckResponse',
        properties: {
          deck_id: {type: 'string'},
          shuffled: {type: 'boolean'},
          remaining: {type: 'number'},
          cards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                value: {type: 'string'},
                suit: {type: 'string'},
                code: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
};
export const DRAW_DECK_RESPONSE: ResponseObject = {
  description: 'Draw a Card',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'DrawDeckResponse',
        properties: {
          cards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                value: {type: 'string'},
                suit: {type: 'string'},
                code: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
};
export const SHUFFLE_DECK_RESPONSE: ResponseObject = {
  description: 'Shuffle a Card',
  content: {
    'application/json': {
      schema: {
        type: 'object',
      },
    },
  },
};
export const DRAW_BY_ID: RequestBodyObject = {
  name: 'count',
  description: 'How many cards to draw from the deck',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          count: {type: 'number'},
        },
      },
    },
  },
  type: 'number',
  jsonSchema: {
    minLength: 0,
  },
};
