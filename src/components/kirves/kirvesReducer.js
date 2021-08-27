import { path, pick, map, reject } from 'ramda'
import { UPDATE_FAILURE } from '../user/userActions'

import {
  INIT_FAILURE,
  GET_GAME_SUCCESS,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  DELETE_GAME_SUCCESS,
  ACTION_FAILURE,
  GET_GAME_FAILURE,
  SHOW_ALL_CARDS,
  GET_LOG,
  GET_LOG_SUCCESS,
  GET_LOG_FAILURE,
  GET_REPLAY_SUCCESS,
  GET_REPLAY_FAILURE,
} from './kirvesActions'

const initialState = {
  game: null,
  games: [],
  cardsVisible: false,
  logId: '',
  logItems: [],
  logVisible: false,
  replay: null,
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_SUCCESS:
      return {
        ...state,
        game: action.response,
        cardsVisible: false,
      }
    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        game: action.response,
      }
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        games: map(
          pick(['id', 'canJoin', 'players', 'lastHandId', 'createdAt', 'admin']),
          action.response,
        ),
      }
    case DELETE_GAME_SUCCESS:
      return {
        ...state,
        games: reject(game => game.id === action.gameId, state.games),
      }
    case GET_LOG: {
      return {
        ...state,
        logId: action.params,
      }
    }
    case GET_LOG_SUCCESS:
      return {
        ...state,
        logItems: action.response,
        logVisible: true,
      }
    case GET_LOG_FAILURE:
      alert(path(['error', 'response', 'data', 'message'], action))
      return {
        ...state,
        logItems: [],
        logVisible: false,
        logId: '',
      }
    case GET_REPLAY_SUCCESS:
      return {
        ...state,
        replay: action.response,
      }
    case GET_REPLAY_FAILURE:
      return {
        ...state,
        replay: null,
      }
    case SHOW_ALL_CARDS:
      return {
        ...state,
        cardsVisible: true,
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
