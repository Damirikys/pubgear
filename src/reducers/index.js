import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import profileReducer from './profileReducer'
import configReducer from './configReducer'

const config = { key: 'root', storage }

export default persistCombineReducers(config, {
  profile: profileReducer,
  config: configReducer,
})
