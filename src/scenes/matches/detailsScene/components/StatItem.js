import React from 'react'
import { Text, View } from 'react-native'

import styles from '../styles'

export default class StatItem extends React.PureComponent {
  styleValue = () => ({
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: this.props.size || 28,
    fontFamily: 'Roboto-Light'
  })

  render() {
    return (
      <View style={styles.statItem}>
        <Text style={styles.statItemTitle}>{this.props.name.toUpperCase()}</Text>
        <Text style={this.styleValue()}>{this.props.value}</Text>
      </View>
    )
  }
}