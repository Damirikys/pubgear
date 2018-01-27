import API from '../api'

import { STATS_FETCH_SUCCESS } from '../actions/statsActions'

import { put, select, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/statsActions'

import * as modes from '../constants/modes'
import * as types from '../constants/types'

const fetchCombinedStats = (profile, config) => {
  const configs = []

  Object.values(modes).forEach(mode =>
    Object.values(types).forEach(type =>
      configs.push({ ...config, mode, type })
    )
  )

  return Promise.all(configs.map(cfg => API.rankedStats(profile, cfg)))
    .then(response => {
      const stats = {}

      response.forEach((data, index) =>
        stats[`${configs[index].mode}:${configs[index].type}`] = data)

      return stats
    })
}

const fetchStatsSaga = function * () {
  try {
    const { profile, config } = yield select(state => state)
    const response = yield fetchCombinedStats(profile, config)
    yield put({ type: STATS_FETCH_SUCCESS, payload: response })
  } catch (e) {
    console.log(e)
  }
}

const statsSaga = function * () {
  yield takeLatest(actions.STATS_FETCH_ACTION, fetchStatsSaga)
}

export default statsSaga
