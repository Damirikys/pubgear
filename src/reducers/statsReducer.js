import * as actions from '../actions/statsActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  rating: 0,
  maxRank: 0,
  position: 0,
  matchesCount: 0,
  winMatchesCount: 0,
  topTenMatchesCount: 0,
  killsCount: 0,
  assistsCount: 0,
  maxKillsPerMatch: 0,
  headshotKillsCount: 0,
  deathCount: 0,
  longestKill: 0,
  averageRank: 0,
  averageDamageDealt: 0,
  averageTimeSurvive: 0,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.STATS_FETCH_SUCCESS:
      return payload //TODO mapper
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
