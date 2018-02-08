import { put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/progressActions'

import {
  FETCH_COMPANIONS_ACTION,
  FETCH_COMPANIONS_FAILED,
  FETCH_COMPANIONS_SUCCESS
} from '../actions/companionsActions'

import {
  FETCH_MATCH_ACTION,
  FETCH_MATCH_SUCCESS,
  FETCH_MATCHES_ACTION,
  FETCH_MATCHES_SUCCESS, LOAD_MATCHES_SUCCESS,
  MATCHES_ACTION_FAILED
} from '../actions/matchesActions'

import {
  SEARCH_PROFILE_ACTION,
  SEARCH_PROFILE_FAILED,
  SEARCH_PROFILE_SUCCESS
} from '../actions/profileActions'

import {
  FETCH_STATS_ACTION,
  FETCH_STATS_FAILED
} from '../actions/statsActions'

const startProgressSaga = function * () {
  yield put({ type: actions.START_PROGRESS_ACTION })
}

const stopProgressSaga = function * () {
  yield put({ type: actions.STOP_PROGRESS_ACTION })
}

const progressSaga = function * () {
  yield takeLatest(SEARCH_PROFILE_ACTION, startProgressSaga)
  yield takeLatest(SEARCH_PROFILE_SUCCESS, stopProgressSaga)
  yield takeLatest(SEARCH_PROFILE_FAILED, stopProgressSaga)

  yield takeLatest(FETCH_STATS_ACTION, startProgressSaga)
  yield takeLatest(FETCH_STATS_FAILED, stopProgressSaga)

  yield takeLatest(FETCH_MATCHES_ACTION, startProgressSaga)
  yield takeLatest(FETCH_MATCHES_SUCCESS, stopProgressSaga)
  yield takeLatest(FETCH_MATCH_ACTION, startProgressSaga)
  yield takeLatest(FETCH_MATCH_SUCCESS, stopProgressSaga)
  yield takeLatest(LOAD_MATCHES_SUCCESS, stopProgressSaga)
  yield takeLatest(MATCHES_ACTION_FAILED, stopProgressSaga)

  yield takeLatest(FETCH_COMPANIONS_ACTION, startProgressSaga)
  yield takeLatest(FETCH_COMPANIONS_SUCCESS, stopProgressSaga)
  yield takeLatest(FETCH_COMPANIONS_FAILED, stopProgressSaga)
}

export default progressSaga
