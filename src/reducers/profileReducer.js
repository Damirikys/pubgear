import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  name: 'JeMinay',
  avatarUrl: null,
  userId: '5a37133fb2e75f000197c3d5'
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
