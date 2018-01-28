import React from 'react'
import { StyleSheet, View } from 'react-native'

export default class Content extends React.Component {
  render() {
    return (
      <View style={styles.content}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16
  }
})