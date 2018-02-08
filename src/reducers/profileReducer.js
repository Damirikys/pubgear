import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  name: null,
  avatarUrl: null,
  userId: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SEARCH_PROFILE_SUCCESS:
      return { ...state, ...payload }
    case actions.APPLY_PROFILE_ACTION:
      return payload
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
