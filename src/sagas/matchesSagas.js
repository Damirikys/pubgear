import API from '../api'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/matchesActions'

const fetchMatchesSagas = function * ({ payload }) {
  try {
    const { profile, config } = yield select(state => state)
    const response = yield call(API.recentMatches, profile, config, payload)

    yield put({
      type: (payload)
        ? actions.MATCHES_LOAD_SUCCESS
        : actions.MATCHES_FETCH_SUCCESS,
      payload: response
    })
  } catch (e) {
    yield put({ type: actions.MATCHES_ACTION_FAILED })
    console.log(e)
  }
}

const fetchMatchDetails = function * ({ payload }) {
  try {
    const response = yield call(API.matchDetails, payload)

    yield put({
      type: actions.FETCH_MATCH_SUCCESS,
      payload: {
        matchId: payload,
        data: response
      }
    })
  } catch (e) {
    yield put({ type: actions.MATCHES_ACTION_FAILED })
    console.log(e)
  }
}

const matchesSagas = function * () {
  yield takeLatest(actions.MATCHES_FETCH_ACTION, fetchMatchesSagas)
  yield takeLatest(actions.FETCH_MATCH_ACTION, fetchMatchDetails)
}

export default matchesSagas
