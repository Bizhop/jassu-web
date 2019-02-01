import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./userActions"

import R from "ramda"

const initialState = {
  email: null,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
    case LOGIN_FAILURE:
      localStorage.removeItem("jassu-token")
      return {
        ...initialState,
        token: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: R.path(["user", "email"], action),
        error: null
      }
    default:
      return state
  }
}

export default userReducer
