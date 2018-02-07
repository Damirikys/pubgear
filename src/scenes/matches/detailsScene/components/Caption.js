import React from 'react'
import { Text, View } from 'react-native'
import { accentColor } from '../../../../constants/themeConfig'

export default class Caption extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style || { marginVertical: 12 }}>
        <View style={styles.view}>
          <Text style={this.props.styleText || styles.text}>{this.props.title}:</Text>
        </View>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  view: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: accentColor,
    marginBottom: 4
  },

  text: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 20,
    fontFamily: 'Roboto-Light'
  }
}