import { INIT_FAILURE, GET_GAME_SUCCESS, GET_GAMES_SUCCESS, GET_GAMES_FAILURE, JOIN_GAME_SUCCESS, ACTION_SUCCESS } from './kirvesActions'

const initialState = {
  game: null,
  games: []
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_SUCCESS:
    case JOIN_GAME_SUCCESS:
    case ACTION_SUCCESS:  
      return {
        ...state,
        game: action.response,
      }
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        games: action.response,
      }
    case INIT_FAILURE:
    case GET_GAMES_FAILURE:
      return initialState
    default:
      return state
  }
}

export default kirvesReducer
