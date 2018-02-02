import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'

export default class StatItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.statBlock}>
        <Text style={styles.statBlockTitle}>{this.props.name.toUpperCase()}: </Text>
        <Text style={styles.statBlockValue}>{this.props.value}</Text>
      </View>
    )
  }
}