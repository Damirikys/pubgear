import API from '../api'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/companionsActions'

const fetchCompanionsStats = async (users, config) => {
  const names = users.map(({ user }) => user.nickname)
  const ids = await Promise.all(names.map(name => API.playerIdByName(name)))
  return await Promise.all(ids.map(userId => API.rankedStats({ userId }, config)))
}

const fetchCompanionsSaga = function * () {
  try {
    const { profile, config } = yield select(state => state)
    const { users } = yield call(API.companions, profile, config)
    const fetchedStats = yield call(fetchCompanionsStats, users, config)

    yield put({
      type: actions.FETCH_COMPANIONS_SUCCESS,
      payload: { users, fetchedStats }
    })
  } catch (e) {
    console.log(e)
  }
}

const companionsSagas = function * () {
  yield takeLatest(actions.FETCH_COMPANIONS_ACTION, fetchCompanionsSaga)
}

export default companionsSagas
