import { all, put, select, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/internalActions'
import { MATCHES_FETCH_ACTION } from '../actions/matchesActions';
import { STATS_FETCH_ACTION } from '../actions/statsActions'

const refreshSaga = function * () {
  yield all([
    put({ type: STATS_FETCH_ACTION }),
    put({ type: MATCHES_FETCH_ACTION })
  ])
}

const internalSaga = function * () {
  yield takeLatest(actions.REFRESH_ACTION, refreshSaga)
}

export default internalSaga
