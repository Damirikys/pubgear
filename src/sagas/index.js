import { fork } from 'redux-saga/effects'

import companionsSagas from './companionsSagas'
import internalSaga from './internalSagas'
import matchesSagas from './matchesSagas'
import profileSaga from './profileSagas'
import statsSaga from './statsSagas'

export const rootSaga = function * () {
  yield [
    fork(internalSaga),
    fork(profileSaga),
    fork(statsSaga),
    fork(matchesSagas),
    fork(companionsSagas)
  ]
}
