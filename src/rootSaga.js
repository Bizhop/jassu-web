import { fork } from 'redux-saga/effects'

import userSaga from './components/user/userSaga'
// import pokerSaga from './components/poker/pokerSaga'
import kirvesSaga from './components/kirves/kirvesSaga'

function* rootSaga() {
  yield fork(userSaga)
  // yield fork(pokerSaga)
  yield fork(kirvesSaga)
}

export default rootSaga
