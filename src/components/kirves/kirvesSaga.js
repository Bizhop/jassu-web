import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  INIT,
  initSuccess,
  initFailure,
} from './kirvesActions'

function* initSaga() {
  try {
    const response = yield call(Api.post, 'api/kirves')
    yield put(initSuccess(response))
  } catch (e) {
    yield put(initFailure(e))
  }
}

function* kirvesSaga() {
  yield [takeEvery(INIT, initSaga)]
}

export default kirvesSaga
