import API from '../api'

import { put, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION, REFRESH_ACTION } from '../actions/internalActions'
import { NEW_QUERY_SUCCESS } from '../actions/queriesActions'

const fetchProfileSaga = function * (action) {
  try {
    const name = action.payload
    const userId = yield call(API.playerIdByName, name)
    const avatarUrl = yield call(API.playerAvatarByName, name)

    const payload = { name, userId, avatarUrl }

    yield put({ type: actions.SEARCH_PROFILE_SUCCESS, payload })
    yield put({ type: NEW_QUERY_SUCCESS, payload })
    yield put({ type: REFRESH_ACTION })
  } catch (e) {
    yield put({ type: actions.SEARCH_PROFILE_FAILED, payload: e })
  }
}

const profileSagas = function * () {
  yield takeLatest(actions.SEARCH_PROFILE_ACTION, fetchProfileSaga)
}

export default profileSagas