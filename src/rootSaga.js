import { fork } from "redux-saga/effects"

import userSaga from "./components/user/userSaga"

function* rootSaga() {
  yield [fork(userSaga)]
}

export default rootSaga
