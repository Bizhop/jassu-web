import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  INIT,
  initSuccess,
  initFailure,
  GET_GAME,
  getGameSuccess,
  getGameFailure
} from './kirvesActions'

function* initSaga() {
  try {
    const response = yield call(Api.post, 'api/kirves')
    yield put(initSuccess(response))
  } catch (e) {
    yield put(initFailure(e))
  }
}

function* getGame(action) {
  try {
    const gameId = action.gameId
    const response = yield call(Api.get, `api/kirves/${gameId}`)
    yield put(getGameSuccess(response))
  } catch (e) {
    yield put(getGameFailure(e))
  }
}

function* kirvesSaga() {
  yield [takeEvery(INIT, initSaga), takeEvery(GET_GAME, getGame)]
}

export default kirvesSaga
