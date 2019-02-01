export const DEAL = 'DEAL'
export const DEAL_SUCCESS = 'DEAL_SUCCESS'
export const DEAL_FAILURE = 'DEAL_FAILURE'

export const deal = params => ({
  type: DEAL,
  params,
})

export const dealSuccess = response => ({
  type: DEAL_SUCCESS,
  response,
})

export const dealFailure = error => ({
  type: DEAL_FAILURE,
  error,
})
