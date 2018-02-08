import API from '../api'

import { FETCH_STATS_SUCCESS } from '../actions/statsActions'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/statsActions'
import createConfigs from '../constants/configs'

const fetchCombinedStats = async (profile, config) => {
  const configs = createConfigs(config)

  return await Promise.all(configs.map(params => API.rankedStats(profile, params)))
    .then(response => response.map((data, index) => ({
      mode: configs[index].mode,
      type: configs[index].type,
      data
    })))
}

const fetchStatsSaga = function * () {
  try {
    const { profile, config } = yield select(state => state)
    if (profile.userId) {
      const response = yield call(fetchCombinedStats, profile, config)
      yield put({ type: FETCH_STATS_SUCCESS, payload: response })
    }
  } catch (e) {
    console.log(e)
  }
}

const statsSaga = function * () {
  yield takeLatest(actions.FETCH_STATS_ACTION, fetchStatsSaga)
}

export default statsSaga
