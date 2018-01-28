import React from 'react'
import Expo from 'expo'

import { AsyncStorage, Text } from 'react-native'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { CLEAR_STATE_ACTION } from './src/actions/internalActions'

import Main from './src/scenes'

import { persistor, store } from './src/store'

const ErrorUtils = require('ErrorUtils')

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
    if (!this.state.isReady)
      return <Text>Loading...</Text>

    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={(<Text>Loading...</Text>)}
        >
          <Content/>
        </PersistGate>
      </Provider>
    )
  }
}

class ContentBody extends React.Component {
  state = { errorsHandled: false }

  async componentWillMount() {
    ErrorUtils.setGlobalHandler(() => AsyncStorage.setItem('errors', 'yes'))
  }

  async componentDidMount() {
    const errors = await AsyncStorage.getItem('errors')
    await AsyncStorage.removeItem('errors')
    if (errors) this.props.clearState()
    //eslint-disable-next-line
    this.setState({ errorsHandled: true })
  }

  render() {
    return this.state.errorsHandled && <Main/>
  }
}

const Content = connect(null, dispatch => ({
  clearState: () => dispatch({ type: CLEAR_STATE_ACTION })
}))(ContentBody)