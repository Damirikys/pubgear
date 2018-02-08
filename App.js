import React from 'react'
import Expo from 'expo'

import { Text } from 'react-native'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import SplashScreen from './src/components/SplashScreen'

import localization from './src/localization'
import { CLEAR_STATE_ACTION } from './src/actions/internalActions'

import Main from './src/scenes'

import { persistor, store } from './src/store'

export default class App extends React.Component {
  state = { isReady: false }

  async componentWillMount() {
    const lng = await Expo.Util.getCurrentLocaleAsync()
    localization.init(lng)

    await Expo.Font.loadAsync({
      'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
      'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf')
    })

    this.setState({ isReady: true })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={(<Text>Loading...</Text>)}
        >
          {!this.state.isReady ? (
            <SplashScreen visible/>
          ) : <Content errors={this.props.exp.errorRecovery}/>}
        </PersistGate>
      </Provider>
    )
  }
}

class ContentBody extends React.Component {
  state = { errorsHandled: false }

  componentDidMount() {
    Expo.ErrorRecovery.setRecoveryProps({ errors: true })
    if (this.props.errors) this.props.clearState()
    this.setState({ errorsHandled: true })
  }

  render() {
    return this.state.errorsHandled && <Main/>
  }
}

const Content = connect(null, dispatch => ({
  clearState: () => dispatch({ type: CLEAR_STATE_ACTION })
}))(ContentBody)