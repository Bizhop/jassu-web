import { all, call, put, takeEvery } from 'redux-saga/effects'
import { dissoc } from 'ramda'

import Api from '../Api'
import {
  INIT,
  initSuccess,
  initFailure,
  GET_GAME,
  getGameSuccess,
  getGameFailure,
  GET_GAMES,
  getGames,
  getGamesSuccess,
  getGamesFailure,
  JOIN_GAME,
  joinGameSuccess,
  joinGameFailure,
  ACTION,
  actionFailure,
  DELETE_GAME,
  deleteGameSuccess,
  deleteGameFailure,
  GET_LOG,
  getLogSuccess,
  getLogFailure,
  getReplaySuccess,
  getReplayFailure,
  GET_REPLAY,
} from './kirvesActions'

function* initSaga() {
  try {
    const response = yield call(Api.post, 'api/kirves')
    yield put(initSuccess(response))
    yield put(getGames())
  } catch (e) {
    yield put(initFailure(e))
  }
}

function* getGameSaga(action) {
  try {
    const response = yield call(Api.get, `api/kirves/${action.gameId}`)
    yield put(getGameSuccess(response))
  } catch (e) {
    yield put(getGameFailure(e))
  }
}

function* getGamesSaga() {
  try {
    const response = yield call(Api.get, `api/kirves`)
    yield put(getGamesSuccess(response))
  } catch (e) {
    yield put(getGamesFailure(e))
  }
}

function* joinGameSaga(action) {
  try {
    const response = yield call(Api.post, `api/kirves/${action.gameId}`)
    yield put(joinGameSuccess(response))
  } catch (e) {
    yield put(joinGameFailure(e))
  }
}

function* actionSaga(action) {
  try {
    const response = yield call(
      Api.put,
      `api/kirves/${action.params.gameId}`,
      dissoc('gameId', action.params),
    )
  } catch (e) {
    yield put(actionFailure(e))
  }
}

function* deleteGameSaga(action) {
  try {
    yield call(Api.delete, `api/kirves/${action.gameId}`)
    yield put(deleteGameSuccess(action.gameId))
  } catch (e) {
    yield put(deleteGameFailure(e))
  }
}

function* getLogSaga(action) {
  const params = action.params
  try {
    const response = yield call(Api.get, `api/kirves/${params.gameId}/${params.handId}`)
    yield put(getLogSuccess(response))
  } catch (e) {
    yield put(getLogFailure(e))
  }
}

function* getReplaySaga(action) {
  const params = action.params
  try {
    const response = yield call(
      Api.get,
      `api/kirves/${params.gameId}/${params.handId}/${params.index}`,
    )
    yield put(getReplaySuccess(response))
  } catch (e) {
    yield put(getReplayFailure(e))
  }
}

function* kirvesSaga() {
  yield all([
    takeEvery(INIT, initSaga),
    takeEvery(GET_GAME, getGameSaga),
    takeEvery(GET_GAMES, getGamesSaga),
    takeEvery(JOIN_GAME, joinGameSaga),
    takeEvery(ACTION, actionSaga),
    takeEvery(DELETE_GAME, deleteGameSaga),
    takeEvery(GET_LOG, getLogSaga),
    takeEvery(GET_REPLAY, getReplaySaga),
  ])
}

export default kirvesSaga
