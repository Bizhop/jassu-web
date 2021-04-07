import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_SUCCESS } from './userActions'

import { path } from 'ramda'

const initialState = {
  email: null,
  error: null,
  money: 0,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
    case LOGIN_FAILURE:
      localStorage.removeItem('jassu-token')
      return {
        ...initialState,
      }
    case LOGIN_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        email: path(['user', 'email'], action),
        money: path(['user', 'money'], action),
        nickname: path(['user', 'nickname'], action),
        error: null,
      }
    default:
      return state
  }
}

export default userReducer
