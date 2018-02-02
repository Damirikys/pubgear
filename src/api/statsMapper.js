/**
 * Convert api response to state of statsReducer
 * @param {Object} data data from api
 * @returns {Object} state for reducer
 */
import { statsModel } from '../reducers/statsReducer'

export default (data) => {
  const { stats, ranks, max_ranks } = data
  try {
    const convertedData = {}

    convertedData.rating = stats.rating
    convertedData.maxRank = max_ranks.rating
    convertedData.position = ranks.rating
    convertedData.matchesCount = stats.matches_cnt
    convertedData.winMatchesCount = stats.win_matches_cnt
    convertedData.topTenMatchesCount = stats.topten_matches_cnt

    convertedData.killsCount = stats.kills_sum
    convertedData.assistsCount = stats.assists_sum
    convertedData.maxKillsPerMatch = stats.kills_max
    convertedData.headshotKillsCount = stats.headshot_kills_sum
    convertedData.deathCount = stats.deaths_sum
    convertedData.longestKill = stats.longest_kill_max

    convertedData.averageRank = stats.rank_avg
    convertedData.averageDamageDealt = stats.damage_dealt_avg
    convertedData.averageTimeSurvive = stats.time_survived_avg

    return convertedData
  } catch (e) {
    return statsModel
  }
}