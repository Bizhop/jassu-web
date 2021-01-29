import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './userActions'

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
      return {
        ...state,
        email: path(['user', 'email'], action),
        money: path(['user', 'money'], action),
        error: null,
      }
    default:
      return state
  }
}

export default userReducer
