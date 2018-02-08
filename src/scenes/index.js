import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { REFRESH_ACTION } from '../actions/internalActions'

import Router from '../router/router'
import SearchScene from './search'
import SplashScreen from '../components/SplashScreen'

class Main extends React.Component {
  componentWillMount() {
    this.props.refreshData()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.profile.userId ? <Router/> : <SearchScene/>}
        <SplashScreen/>
      </View>
    )
  }
}

export default connect(state => ({
  profile: state.profile
}), dispatch => ({
  refreshData: () => dispatch({ type: REFRESH_ACTION })
}))(Main)