import { path } from 'ramda'

import { INIT_FAILURE, GET_GAME_SUCCESS, GET_GAMES_SUCCESS, GET_GAMES_FAILURE, JOIN_GAME_SUCCESS, JOIN_GAME_FAILURE } from './kirvesActions'

const initialState = {
  game: null,
  games: []
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_SUCCESS:
    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        game: action.response,
      }
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        games: action.response,
      }
    case JOIN_GAME_FAILURE:
      alert(path(['error', 'response', 'data', 'message'], action))
      return state
    case INIT_FAILURE:
    case GET_GAMES_FAILURE:
      return initialState
    default:
      return state
  }
}

export default kirvesReducer
