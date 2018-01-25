import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  name: null,
  userId: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.PROFILE_SAVE_ACTION:
      return payload
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
