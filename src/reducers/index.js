import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import rootReducer from './rootReducer'

const config = { key: 'root', storage }

export default persistCombineReducers(config, {
  root: rootReducer
})
