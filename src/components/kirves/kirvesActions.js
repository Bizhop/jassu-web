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
export const DELETE_GAME = 'kirves/DELETE_GAME'
export const DELETE_GAME_SUCCESS = 'kirves/DELETE_GAME_SUCCESS'
export const DELETE_GAME_FAILURE = 'kirves/DELETE_GAME_FAILURE'
export const ACTION = 'kirves/ACTION'
export const ACTION_SUCCESS = 'kirves/ACTION_SUCCESS'
export const ACTION_FAILURE = 'kirves/ACTION_FAILURE'
export const GET_LOG = 'kirves/GET_LOG'
export const GET_LOG_SUCCESS = 'kirves/GET_LOG_SUCCESS'
export const GET_LOG_FAILURE = 'kirves/GET_LOG_FAILURE'
export const SHOW_ALL_CARDS = 'kirves/SHOW_ALL_CARDS'
export const GET_REPLAY = 'kirves/GET_REPLAY'
export const GET_REPLAY_SUCCESS = 'kirves/GET_REPLAY_SUCCESS'
export const GET_REPLAY_FAILURE = 'kirves/GET_REPLAY_FAILURE'

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

export const deleteGame = gameId => ({
  type: DELETE_GAME,
  gameId,
})

export const deleteGameSuccess = gameId => ({
  type: DELETE_GAME_SUCCESS,
  gameId,
})

export const deleteGameFailure = error => ({
  type: DELETE_GAME_FAILURE,
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

export const getLog = params => ({
  type: GET_LOG,
  params,
})

export const getLogSuccess = response => ({
  type: GET_LOG_SUCCESS,
  response,
})

export const getLogFailure = error => ({
  type: GET_LOG_FAILURE,
  error,
})

export const showAllCards = () => ({
  type: SHOW_ALL_CARDS,
})

export const getReplay = params => ({
  type: GET_REPLAY,
  params,
})

export const getReplaySuccess = response => ({
  type: GET_REPLAY_SUCCESS,
  response,
})

export const getReplayFailure = error => ({
  type: GET_REPLAY_FAILURE,
  error,
})
