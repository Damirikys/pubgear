export const BASE_URL = 'https://pubg.op.gg'

class APIService {
  playerIdByName = async (name) => {
    const response = await fetch(`${BASE_URL}/search/?playerName=${name}`)
    const responseText = await response.text()
    return responseText.match(/data-user_id="(\w+)"/)[1]
  }

  playerAvatarByName = async (name) => {
    try {
      const response = await fetch(`https://pubg.me/player/${name}`)
      const responseText = await response.text()
      return responseText.match(/data-image="(.+)"/)[1]
    } catch (e) {
      return null
    }
  }

  rankedStats = async (profile, { season, server, type, mode }) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/ranked-stats?season=${season}&server=${server}&queue_size=${type}&mode=${mode}`)
    return await response.json()
  }

  companions = async (profile, { season, server }) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/matches/summary-played-with?season=${season}&server=${server}&`)
    return await response.json()
  }

  recentMatches = async (profile, { server, type, mode }, offset) => {
    const response = await fetch(`${BASE_URL}/api/users/${profile.userId}/matches/recent?server=${server}&queue_size=${type}&mode=${mode}${offset ? `&after=${offset}` : ''}`)
    return await response.json()
  }

  matchDetails = async (matchId) => {
    const response = await Promise.all([
      fetch(`${BASE_URL}/api/matches/${matchId}`).then(response => response.json()),
      fetch(`${BASE_URL}/api/matches/${matchId}/deaths`).then(response => response.json()),
    ])

    return response.reduce((result, current) => ({ ...result, ...current }), {})
  }

  mapsDetails = async () => {
    const response = await fetch(`${BASE_URL}/api/const/maps`)
    return await response.json()
  }
}

export default new APIService()