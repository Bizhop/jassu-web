import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './userActions'

import R from 'ramda'

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
        token: null,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: R.path(['user', 'email'], action),
        money: R.path(['user', 'money'], action),
        error: null,
      }
    default:
      return state
  }
}

export default userReducer
