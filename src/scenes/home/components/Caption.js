import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'

export default class Caption extends React.PureComponent {
  render() {
    return (
      <View style={styles.title}>
        <Text style={styles.h2}>{this.props.name}</Text>
      </View>
    )
  }
}