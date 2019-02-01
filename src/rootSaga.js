import { fork } from 'redux-saga/effects'

import userSaga from './components/user/userSaga'
import pokerSaga from './components/poker/pokerSaga'

function* rootSaga() {
  yield [fork(userSaga), fork(pokerSaga)]
}

export default rootSaga
