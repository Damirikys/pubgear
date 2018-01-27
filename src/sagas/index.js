import { fork } from 'redux-saga/effects'

import internalSaga from './internalSagas'
import statsSaga from './statsSagas'

export const rootSaga = function * () {
  yield [
    fork(internalSaga),
    fork(statsSaga),
  ]
}
