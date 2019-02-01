export const AUTO_LOGIN = "AUTO_LOGIN"
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"

export const autoLogin = () => ({
  type: AUTO_LOGIN
})

export const login = params => ({
  type: LOGIN_REQUEST,
  params
})

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
})

export const loginError = error => ({
  type: LOGIN_FAILURE,
  error
})

export const logout = () => ({
  type: LOGOUT
})
