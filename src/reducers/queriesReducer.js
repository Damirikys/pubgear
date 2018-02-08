import * as actions from '../actions/queriesActions'

export default (state = [], { type, payload } ) => {
  switch (type) {
    case actions.NEW_QUERY_SUCCESS:
      return [ payload, ...state.filter(x => x.userId !== payload.userId) ]
  }

  return state
}
