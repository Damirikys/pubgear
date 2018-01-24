import React from 'react'
import Expo from 'expo'

import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { persistor, store } from './src/store'

export default class App extends React.Component {
  state = { isReady: false }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
      'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf')
    })

    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) return <Text>Loading...</Text>

    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={(<Text>Loading...</Text>)}
        >
          <Text>Hello world</Text>
        </PersistGate>
      </Provider>
    )
  }
}
