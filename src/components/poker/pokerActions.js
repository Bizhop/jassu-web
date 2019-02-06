export const DEAL = 'DEAL'
export const DEAL_SUCCESS = 'DEAL_SUCCESS'
export const DEAL_FAILURE = 'DEAL_FAILURE'
export const TOGGLE_HOLD = 'TOGGLE_HOLD'
export const ACTION = 'ACTION'
export const ACTION_SUCCESS = 'ACTION_SUCCESS'
export const ACTION_FAILURE = 'ACTION_FAILURE'

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
