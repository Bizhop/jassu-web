import { path, pick, map, reject } from 'ramda'
import { UPDATE_FAILURE } from '../user/userActions'

import { INIT_FAILURE, GET_GAME_SUCCESS, GET_GAMES_SUCCESS, GET_GAMES_FAILURE, JOIN_GAME_SUCCESS, JOIN_GAME_FAILURE, DELETE_GAME_SUCCESS, ACTION_FAILURE, GET_GAME_FAILURE, SHOW_ALL_CARDS } from './kirvesActions'

const initialState = {
  game: null,
  games: [],
  cardsVisible: false
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_SUCCESS:
      return {
        ...state,
        game: action.response,
        cardsVisible: false
      }
    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        game: action.response,
      }
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        games: map(pick(['id', 'canJoin', 'players', 'createdAt', 'admin']), action.response),
      }
    case DELETE_GAME_SUCCESS:
      return {
        ...state,
        games: reject(game => game.id === action.gameId, state.games)
      }
    case SHOW_ALL_CARDS:
      return {
        ...state,
        cardsVisible: true
      }
    case JOIN_GAME_FAILURE:
    case ACTION_FAILURE:
    case INIT_FAILURE:
    case GET_GAMES_FAILURE:
    case GET_GAME_FAILURE:
    case UPDATE_FAILURE:
      alert(path(['error', 'response', 'data', 'message'], action))
      return state
    default:
      return state
  }
}

export default kirvesReducer
