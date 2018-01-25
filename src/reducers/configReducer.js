import * as actions from '../actions/configActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'
import { CURRENT_SEASON } from '../constants/seasons'
import { EU } from '../constants/servers'
import { SOLO } from '../constants/types'
import { TPP } from '../constants/modes'

const initialState = {
  season: CURRENT_SEASON,
  server: EU,
  type: SOLO,
  mode: TPP
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.CONFIG_CHANGE_ACTION:
      return payload
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
