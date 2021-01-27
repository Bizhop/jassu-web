export const INIT = 'INIT'
export const INIT_SUCCESS = 'INIT_SUCCESS'
export const INIT_FAILURE = 'INIT_FAILURE'


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
