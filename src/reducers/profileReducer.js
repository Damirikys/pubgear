import * as actions from '../actions/profileActions'
import { CLEAR_STATE_ACTION } from '../actions/internalActions'

const initialState = {
  name: null,
  avatarUrl: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/d4/d498fe521a44ae573d40528e0648d877e99d0dc2_full.jpg',
  userId: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actions.SEARCH_PROFILE_SUCCESS:
      return { ...state, ...payload }
    case CLEAR_STATE_ACTION:
      return initialState
  }

  return state
}
