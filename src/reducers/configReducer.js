import * as actions from '../actions/configActions'

import { CLEAR_STATE_ACTION } from '../actions/internalActions'
import { CURRENT_SEASON } from '../constants/seasons'
import { EU } from '../constants/servers'
import { SOLO } from '../constants/types'
import { TPP } from '../constants/modes'

export const initialState = {
  season: CURRENT_SEASON,
  server: EU,
  type: SOLO,
  mode: TPP
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SAVE_CONFIG_ACTION:
      return payload
  }

  return state
}
