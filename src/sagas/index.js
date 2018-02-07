import { fork } from 'redux-saga/effects'

import companionsSagas from './companionsSagas'
import internalSagas from './internalSagas'
import matchesSagas from './matchesSagas'
import profileSagas from './profileSagas'
import configSagas from './configSagas'
import statsSagas from './statsSagas'

export const rootSaga = function * () {
  yield [
    fork(internalSagas),
    fork(profileSagas),
    fork(statsSagas),
    fork(matchesSagas),
    fork(companionsSagas),
    fork(configSagas)
  ]
}
