import { put, select, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/internalActions'
import { STATS_FETCH_ACTION } from '../actions/statsActions'

const refreshSaga = function * () {
  yield put({ type: actions.CLEAR_STATE_ACTION })

  const { profile } = yield select(state => state)
  if (profile.userId) yield put({ type: STATS_FETCH_ACTION })
}

const internalSaga = function * () {
  yield takeLatest(actions.REFRESH_ACTION, refreshSaga)
}

export default internalSaga
