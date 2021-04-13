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
  deleteGameFailure
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
    const response = yield call(Api.put, `api/kirves/${action.params.gameId}`, dissoc('gameId', action.params))
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

function* kirvesSaga() {
  yield all([
    takeEvery(INIT, initSaga),
    takeEvery(GET_GAME, getGameSaga),
    takeEvery(GET_GAMES, getGamesSaga),
    takeEvery(JOIN_GAME, joinGameSaga),
    takeEvery(ACTION, actionSaga),
    takeEvery(DELETE_GAME, deleteGameSaga)
  ])
}

export default kirvesSaga
