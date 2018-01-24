import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import { rootSaga } from '../sagas'

const storeProvider = (() => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducers, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)

  const persistor = persistStore(store)

  return { persistor, store }
})()

export const { persistor, store } = storeProvider
