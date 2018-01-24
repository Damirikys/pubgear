const BASE_URL = 'https://pubg.op.gg'

class APIService {
  playerIdByName = async(name) => {
    const response = await fetch(`${BASE_URL}/search/?playerName=${name}`)
    const responseText = await response.text()
    return responseText.match(/data-user_id="(\w+)"/)[1]
  }

  rankedStatsById = async(id) => {
    const response = await fetch(`${BASE_URL}/api/users/${id}/ranked-stats?season=2018-01&server=eu&queue_size=1&mode=tpp`)
    return await response.json()
  }
}

export default new APIService()