export const AUTO_LOGIN = 'user/AUTO_LOGIN'
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE'
export const LOGOUT = 'user/LOGOUT'
export const UPDATE_REQUEST = 'user/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'user/UPDATE_FAILURE'

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

export const update = params => ({
  type: UPDATE_REQUEST,
  params
})

export const updateSuccess = user => ({
  type: UPDATE_SUCCESS,
  user
})

export const updateError = error => ({
  type: UPDATE_FAILURE,
  error
})
