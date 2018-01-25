export const BASE_URL = 'https://pubg.op.gg'
export const BASE_STATIC_URL = 'https://opgg-pubg-static.akamaized.net'

class APIService {
  playerIdByName = async(name) => {
    const response = await fetch(`${BASE_URL}/search/?playerName=${name}`)
    const responseText = await response.text()
    return responseText.match(/data-user_id="(\w+)"/)[1]
  }

  rankedStats = async(profile, { season, server, type, mode }) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/ranked-stats?season=${season}&server=${server}&queue_size=${type}&mode=${mode}`)
    return await response.json()
  }

  companions = async(profile, { season, server }) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/matches/summary-played-with?season=${season}&server=${server}&`)
    return await response.json()
  }

  recentMatches = async(profile, { server, type, mode }, offset = 0) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/matches/recent?server=${server}&queue_size=${type}&mode=${mode}&after=${offset}`)
    return await response.json()
  }

  matchDetails = async(matchId) => {
    return await Promise.all([
      fetch(`${BASE_URL}/api/matches/${matchId}`).then(response => response.json()),
      fetch(`${BASE_URL}/api/matches/${matchId}/deaths`).then(response => response.json()),
    ]).reduce((result, current) => ({ ...result, ...current }), {})
  }

  mapsDetails = async() => {
    const response = await fetch(`${BASE_URL}/api/const/maps`)
    return await response.json()
  }
}

export default new APIService()