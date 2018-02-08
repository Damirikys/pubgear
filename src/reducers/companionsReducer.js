import * as actions from '../actions/companionsActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'
import statsMapper from '../api/statsMapper'

export default (state = [], { type, payload }) => {
  switch (type) {
    case actions.FETCH_COMPANIONS_SUCCESS:
      const { users, fetchedStats } = payload
      return users.map(({ user, stats }, index) => ({
        name: user.nickname, ...stats,
        ...statsMapper(fetchedStats[index])
      }))
    case CLEAR_STATE_ACTION:
      return []
  }

  return state
}
