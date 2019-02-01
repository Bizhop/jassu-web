import { DEAL_SUCCESS, DEAL_FAILURE } from './pokerActions'

import R from 'ramda'

const initialState = {
  game: null,
}

const pokerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEAL_SUCCESS:
      return {
        ...state,
        game: action.response,
      }
    case DEAL_FAILURE:
    default:
      return state
  }
}

export default pokerReducer
