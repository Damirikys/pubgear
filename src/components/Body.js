import React from 'react'

import { LinearGradient, Constants } from 'expo'
import { StyleSheet } from 'react-native'
import { endGradientColor, startGradientColor } from '../constants/themeConfig'

export default class Body extends React.Component {
  render() {
    return (
      <LinearGradient
        style={styles.body}
        start={this.props.start || { x: 0, y: 1 }}
        end={this.props.end || { x: 0, y: 0 }}
        colors={[startGradientColor, endGradientColor]}
      >
          {this.props.children}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
})