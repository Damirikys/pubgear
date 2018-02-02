import { StyleSheet } from 'react-native'
import { accentColor, primaryColor, primaryLight, primaryText } from '../../constants/themeConfig'

export default StyleSheet.create({
  username: {
    color: primaryText,
    fontSize: 28,
    fontFamily: 'Roboto-Light',
    marginVertical: 8,
  },

  statView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: primaryText,
    fontSize: 18,
    fontFamily: 'Roboto-Light'
  },

  textInput: {
    color: primaryText,
    fontSize: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    fontFamily: 'Roboto-Light'
  },

  statblock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 6
  },

  h2: {
    opacity: 0.8,
    fontFamily: 'Roboto',
    fontSize: 20,
    color: accentColor,
    marginVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderLeftWidth: 4,
    borderLeftColor: accentColor,
    marginHorizontal: -16,
    padding: 12
  }
})