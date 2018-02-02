import * as actions from '../actions/matchesActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  summary: null,
  items: []
}

export default (state = null, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.MATCHES_FETCH_SUCCESS:
      if (!payload.matches) return { ...state, message: 'Статистики нет' }

      const { summary, items } = payload.matches
      return {
        items,
        summary: {
          ...summary,
          rating_data: items.map(x => x.participant.stats.rating_delta),
          kills_data: items.map(x => x.participant.stats.combat.kda.kills),
          assists_data: items.map(x => x.participant.stats.combat.kda.assists),
          boosts_data: items.map(x => x.participant.stats.combat.boosts),
          heals_data: items.map(x => x.participant.stats.combat.heals),
          weapon_acquired_data: items.map(x => x.participant.stats.combat.weapon_acquired),
          walk_distance_data: items.map(x => x.participant.stats.combat.distance_traveled.walk_distance),
          ride_distance_data: items.map(x => x.participant.stats.combat.distance_traveled.ride_distance),
          damage_dealt_data: items.map(x => x.participant.stats.combat.damage.damage_dealt),
          knocks_data: items.map(x => x.participant.stats.combat.dbno.knock_downs),
          revives_data: items.map(x => x.participant.stats.combat.dbno.revives)
        }
      }
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
