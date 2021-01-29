export const DEAL = 'poker/DEAL'
export const DEAL_SUCCESS = 'poker/DEAL_SUCCESS'
export const DEAL_FAILURE = 'poker/DEAL_FAILURE'
export const TOGGLE_HOLD = 'poker/TOGGLE_HOLD'
export const ACTION = 'poker/ACTION'
export const ACTION_SUCCESS = 'poker/ACTION_SUCCESS'
export const ACTION_FAILURE = 'poker/ACTION_FAILURE'

export const deal = () => ({
  type: DEAL,
})

export const dealSuccess = response => ({
  type: DEAL_SUCCESS,
  response,
})

export const dealFailure = error => ({
  type: DEAL_FAILURE,
  error,
})

export const toggleHold = value => ({
  type: TOGGLE_HOLD,
  value,
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
