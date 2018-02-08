import * as actions from '../actions/progressActions'

export default (state = false, { type } ) => {
  switch (type) {
    case actions.START_PROGRESS_ACTION: return true
    case actions.STOP_PROGRESS_ACTION: return false
  }

  return state
}
