export const AUTO_LOGIN = 'user/AUTO_LOGIN'
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE'
export const LOGOUT = 'user/LOGOUT'

export const autoLogin = () => ({
  type: AUTO_LOGIN,
})

export const login = params => ({
  type: LOGIN_REQUEST,
  params,
})

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
})

export const loginError = error => ({
  type: LOGIN_FAILURE,
  error,
})

export const logout = () => ({
  type: LOGOUT,
})
