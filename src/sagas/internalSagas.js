import { all, put, select, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/internalActions'

import { FETCH_COMPANIONS_ACTION } from '../actions/companionsActions'
import { FETCH_MATCHES_ACTION } from '../actions/matchesActions'
import { APPLY_PROFILE_ACTION } from '../actions/profileActions';
import { FETCH_STATS_ACTION } from '../actions/statsActions'

const refreshSaga = function * () {
  try {
    const { profile } = yield select(state => state)
    if (profile.userId) {
      yield all([
        put({ type: FETCH_STATS_ACTION }),
        put({ type: FETCH_MATCHES_ACTION }),
        put({ type: FETCH_COMPANIONS_ACTION }),
      ])
    }
  } catch (e) {
    yield put({ type: actions.REFRESH_FAILED })
  }
}

const internalSaga = function * () {
  yield takeLatest(actions.REFRESH_ACTION, refreshSaga)
  yield takeLatest(APPLY_PROFILE_ACTION, refreshSaga)
}

export default internalSaga
