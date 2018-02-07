import { put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/configActions'

import { REFRESH_ACTION } from '../actions/internalActions'

const saveConfigSaga = function * ({ payload }) {
  yield put({ type: actions.SAVE_CONFIG_ACTION, payload })
  yield put({ type: REFRESH_ACTION })
}

const configSaga = function * () {
  yield takeLatest(actions.CHANGE_CONFIG_ACTION, saveConfigSaga)
}

export default configSaga
