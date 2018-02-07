import * as actions from '../actions/matchesActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  status: false,
  summary: null,
  items: [],
  data: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_MATCHES_ACTION:
      return { ...state, status: true }
    case actions.LOAD_MATCHES_SUCCESS:
      return (payload.matches) ? {
        ...state,
        status: false,
        items: [ ...state.items, ...payload.matches.items ]
      } : state
    case actions.FETCH_MATCHES_SUCCESS:
      if (!payload.matches) return state

      const { summary, items } = payload.matches
      return {
        ...state, items, status: false,
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
    case actions.FETCH_MATCH_SUCCESS:
      return {
        ...state,
        status: false,
        data: { ...state.data, [payload.matchId]: payload.data }
      }
    case actions.MATCHES_ACTION_FAILED:
      return { ...state, status: false }
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
