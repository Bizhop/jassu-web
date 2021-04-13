import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  DEAL,
  dealSuccess,
  dealFailure,
  ACTION,
  actionSuccess,
  actionFailure,
} from './pokerActions'

function* dealSaga() {
  try {
    const response = yield call(Api.get, 'api/poker/deal')
    yield put(dealSuccess(response))
  } catch (e) {
    yield put(dealFailure(e))
  }
}

function* actionSaga(action) {
  try {
    const response = yield call(Api.post, `/api/poker/${action.params.game.gameId}`, {
      action: action.params.action,
      parameters: action.params.holds,
    })
    yield put(actionSuccess(response))
  } catch (e) {
    yield put(actionFailure(e))
  }
}

function* pokerSaga() {
  yield all([takeEvery(DEAL, dealSaga), takeEvery(ACTION, actionSaga)])
}

export default pokerSaga
