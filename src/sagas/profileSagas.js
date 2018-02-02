import API from '../api'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION, REFRESH_ACTION } from '../actions/internalActions'

const fetchProfileSaga = function * (action) {
  try {
    yield put({ type: CLEAR_STATE_ACTION })

    const name = action.payload
    const userId = yield call(API.playerIdByName, name)
    yield put({ type: actions.PROFILE_SEARCH_SUCCESS, payload: { name, userId } })
    yield put({ type: REFRESH_ACTION })
  } catch (e) {
    console.log(e)
  }
}

const profileSagas = function * () {
  yield takeLatest(actions.PROFILE_SEARCH_ACTION, fetchProfileSaga)
}

export default profileSagas