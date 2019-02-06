import {
  DEAL_SUCCESS,
  DEAL_FAILURE,
  TOGGLE_HOLD,
  ACTION_SUCCESS,
  ACTION_FAILURE,
} from './pokerActions'

import { ifElse, includes, compose, reject, append, sort } from 'ramda'

const initialState = {
  game: null,
  holds: [],
  userMoney: null
}

const sortAsc = sort((a, b) => a - b)

const pokerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEAL_SUCCESS:
    case ACTION_SUCCESS:
      return {
        ...state,
        game: action.response,
        holds: [],
        userMoney: action.response.userMoney
      }
    case TOGGLE_HOLD:
      return {
        ...state,
        holds: ifElse(
          includes(action.value),
          reject(n => n === action.value),
          compose(sortAsc, append(action.value)),
        )(state.holds),
      }
    case DEAL_FAILURE:
    case ACTION_FAILURE:
      return initialState
    default:
      return state
  }
}

export default pokerReducer
