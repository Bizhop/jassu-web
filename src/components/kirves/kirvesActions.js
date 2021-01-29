export const INIT = 'kirves/INIT'
export const INIT_SUCCESS = 'kirves/INIT_SUCCESS'
export const INIT_FAILURE = 'kirves/INIT_FAILURE'
export const GET_GAME = 'kirves/GET_GAME'
export const GET_GAME_SUCCESS = 'kirves/GET_GAME_SUCCESS'
export const GET_GAME_FAILURE = 'kirves/GET_GAME_FAILURE'
export const GET_GAMES = 'kirves/GET_GAMES'
export const GET_GAMES_SUCCESS = 'kirves/GET_GAMES_SUCCESS'
export const GET_GAMES_FAILURE = 'kirves/GET_GAMES_FAILURE'
export const JOIN_GAME = 'kirves/JOIN_GAME'
export const JOIN_GAME_SUCCESS = 'kirves/JOIN_GAME_SUCCESS'
export const JOIN_GAME_FAILURE = 'kirves/JOIN_GAME_FAILURE'
export const ACTION = 'kirves/ACTION'
export const ACTION_SUCCESS = 'kirves/ACTION_SUCCESS'
export const ACTION_FAILURE = 'kirves/ACTION_FAILURE'

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
  gameId,
})

export const getGameSuccess = response => ({
  type: GET_GAME_SUCCESS,
  response,
})

export const getGameFailure = error => ({
  type: GET_GAME_FAILURE,
  error,
})

export const getGames = () => ({
  type: GET_GAMES,
})

export const getGamesSuccess = response => ({
  type: GET_GAMES_SUCCESS,
  response,
})

export const getGamesFailure = error => ({
  type: GET_GAMES_FAILURE,
  error,
})

export const joinGame = gameId => ({
  type: JOIN_GAME,
  gameId,
})

export const joinGameSuccess = response => ({
  type: JOIN_GAME_SUCCESS,
  response,
})

export const joinGameFailure = error => ({
  type: JOIN_GAME_FAILURE,
  error,
})

export const action = params => ({
  type: ACTION,
  params,
})

export const actionSuccess = response => ({
  type: ACTION_SUCCESS,
  response,
})

export const actionFailure = error => ({
  type: ACTION_FAILURE,
  error,
})
