import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { DEAL, dealSuccess, dealFailure } from './pokerActions'

function* dealSaga(action) {
  try {
    const response = yield call(Api.getRaw, 'api/poker/deal')
    yield put(dealSuccess(response))
  } catch (e) {
    yield put(dealFailure(e))
  }
}

function* pokerSaga() {
  yield [takeEvery(DEAL, dealSaga)]
}

export default pokerSaga
