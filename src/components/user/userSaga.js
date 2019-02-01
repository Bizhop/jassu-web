import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { LOGIN_REQUEST, loginSuccess, loginError, AUTO_LOGIN } from './userActions'

function* loginSaga(action) {
  try {
    const token = action.params.tokenId
    const response = yield call(Api.getRaw, 'api/auth', {
      headers: {
        Authorization: token,
      },
    })
    localStorage.setItem('jassu-token', response.jwt)
    yield put(loginSuccess(response))
  } catch (e) {
    yield put(loginError(e))
  }
}

function* autoLoginSaga(action) {
  try {
    const token = localStorage.getItem('jassu-token')
    const response = yield call(Api.getRaw, 'api/auth', {
      headers: {
        Authorization: token,
      },
    })
    yield put(loginSuccess(response))
  } catch (e) {
    yield put(loginError(e))
  }
}

function* userSaga() {
  yield [takeEvery(LOGIN_REQUEST, loginSaga), takeEvery(AUTO_LOGIN, autoLoginSaga)]
}

export default userSaga
