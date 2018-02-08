import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, Dimensions } from 'react-native'
import { accentColor } from '../constants/themeConfig'

const styles = {
  splash: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class SplashScreen extends React.Component {
  render() {
    if (!this.props.visible && !this.props.progress)
      return null

    return (
      <View style={styles.splash}>
        <ActivityIndicator
          size="large"
          color={accentColor} />
      </View>
    )
  }
}

export default connect(state => ({
  progress: state.progress
}))(SplashScreen)