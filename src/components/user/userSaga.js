import { all, call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { LOGIN_REQUEST, loginSuccess, loginError, AUTO_LOGIN, UPDATE_REQUEST, updateSuccess, updateError } from './userActions'

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

function* autoLoginSaga() {
  try {
    const token = localStorage.getItem('jassu-token')
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

function* updateUserSaga(action) {
  try {
    const response = yield call(Api.put, 'api/user', action.params)
    yield put(updateSuccess(response))
  } catch (e) {
    yield put(updateError(e))
  }
}

function* userSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga)
  yield takeEvery(AUTO_LOGIN, autoLoginSaga)
  yield takeEvery(UPDATE_REQUEST, updateUserSaga)
}

export default userSaga
