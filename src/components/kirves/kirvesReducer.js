import {
  INIT_SUCCESS,
  INIT_FAILURE
} from './kirvesActions'

const initialState = {
  game: null,
}

const kirvesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SUCCESS:
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
