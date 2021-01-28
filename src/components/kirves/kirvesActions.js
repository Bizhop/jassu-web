export const INIT = 'INIT'
export const INIT_SUCCESS = 'INIT_SUCCESS'
export const INIT_FAILURE = 'INIT_FAILURE'
export const GET_GAME = 'GET_GAME'
export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS'
export const GET_GAME_FAILURE = 'GET_GAME_FAILURE'

export const init = () => ({
  type: INIT,
})

export const initSuccess = response => ({
  type: INIT_SUCCESS,
  response,
})

export const initFailure = error => ({
  type: INIT_FAILURE,
  error,
})

export const getGame = gameId => ({
  type: GET_GAME,
  gameId
})

export const getGameSuccess = response => ({
  type: GET_GAME_SUCCESS,
  response,
})

export const getGameFailure = error => ({
  type: GET_GAME_FAILURE,
  error,
})