import API from '../api'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/matchesActions'

const fetchMatchesSagas = function * ({ payload }) {
  try {
    const { profile, config } = yield select(state => state)
    const response = yield call(API.recentMatches, profile, config, payload)
    yield put({ type: actions.MATCHES_FETCH_SUCCESS, payload: response })
  } catch (e) {
    console.log(e)
  }
}

const matchesSagas = function * () {
  yield takeLatest(actions.MATCHES_FETCH_ACTION, fetchMatchesSagas)
}

export default matchesSagas
