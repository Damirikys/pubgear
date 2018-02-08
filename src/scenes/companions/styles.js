import { StyleSheet } from 'react-native'
import { accentColor, accentColorDark, primaryText } from '../../constants/themeConfig'

export default StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  userItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.025)'
  },

  myMatches: {
    color: accentColor,
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    opacity: 0.75
  },

  userItemExp: {
    padding: 18,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomColor: 'rgba(255, 255, 255, 0.025)'
  },

  userDetails: {
    padding: 16,
    marginTop: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },

  userName: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    color: primaryText,
    marginBottom: 8,
    opacity: 0.75
  },

  userRating: {
    color: 'green',
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  statView: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    marginRight: 8,
    justifyContent: 'space-between'
  },

  statTitle: {
    fontSize: 8,
    fontFamily: 'Roboto-Regular',
    color: 'gray',
    opacity: 0.75
  },

  statValue: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    color: primaryText,
    marginTop: 4,
    opacity: 0.75
  },

  expView: {
    marginVertical: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.025)'
  },

  expText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: 'gray',
    opacity: 0.5
  },

  expValue: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    color: primaryText,
    opacity: 0.5
  }
})