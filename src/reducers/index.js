import storage from 'redux-persist/es/storage'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import companionsReducer from './companionsReducer'
import matchesReducer from './matchesReducer'
import profileReducer from './profileReducer'
import configReducer from './configReducer'
import statsReducer from './statsReducer'

const rootConfig = { key: 'root', storage }

const matchesPersistConfig = {
  key: 'matches',
  storage,
  blacklist: ['data']
}

const rootReducer = combineReducers({
  profile: profileReducer,
  config: configReducer,
  stats: statsReducer,
  matches: persistReducer(matchesPersistConfig, matchesReducer),
  companions: companionsReducer
})

export default persistReducer(rootConfig, rootReducer)
