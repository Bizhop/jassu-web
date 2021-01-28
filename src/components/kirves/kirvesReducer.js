import {
  INIT_SUCCESS,
  INIT_FAILURE,
  GET_GAME_SUCCESS
} from './kirvesActions'

const initialState = {
  game: null,
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SUCCESS:
    case GET_GAME_SUCCESS:
      return {
        ...state,
        game: action.response
      }
    case INIT_FAILURE:
      return initialState
    default:
      return state
  }
}

export default kirvesReducer
