import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import matchesReducer from './matchesReducer'
import profileReducer from './profileReducer'
import configReducer from './configReducer'
import statsReducer from './statsReducer'

const config = { key: 'root', storage }

export default persistCombineReducers(config, {
  profile: profileReducer,
  config: configReducer,
  stats: statsReducer,
  matches: matchesReducer
})
