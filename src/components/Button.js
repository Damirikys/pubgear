import React from 'react'
import { Text, View } from 'react-native'
import Touchable from 'react-native-touchable-safe'
import {
  accentColor, accentColorDark, accentTextColor, buttonColor, primaryLight,
  primaryText
} from '../constants/themeConfig';

export default class Button extends React.PureComponent {
  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={{
          flex: 1,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: buttonColor,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: primaryLight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 2,
          shadowOpacity: 0.25,
          elevation: 2,
        }}>
          <Text style={{
            color: accentTextColor,
            fontSize: 16,
            fontFamily: 'Roboto-Regular'
          }}>{this.props.text.toUpperCase()}</Text>
        </View>
      </Touchable>
    )
  }
}