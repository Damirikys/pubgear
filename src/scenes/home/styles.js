import { StyleSheet } from 'react-native'
import { primaryColor, primaryText } from '../../constants/themeConfig'

export default StyleSheet.create({
  block: {
    backgroundColor: primaryColor,
    borderRadius: 10,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0b0c13',
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 20,
    shadowOpacity: 0.75
  },

  text: {
    color: primaryText
  }
})