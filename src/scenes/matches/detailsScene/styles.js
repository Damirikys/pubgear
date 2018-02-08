import { StyleSheet, Dimensions } from 'react-native'
import { accentColor, primaryText, primaryTextDark } from '../../../constants/themeConfig'

export default StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },

  rankText: {
    fontSize: 64,
    color: accentColor,
    fontFamily: 'Roboto-Light',
    marginTop: -12
  },

  rankAllText: {
    fontSize: 24,
    color: primaryTextDark,
    fontFamily: 'Roboto-Light'
  },

  typeModeView: {
    marginLeft: 16
  },

  modeType: {
    fontSize: 24,
    color: accentColor,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  fromNow: {
    fontSize: 12,
    color: primaryTextDark,
    fontFamily: 'Roboto-Light'
  },

  teamView: {
    alignItems: 'flex-end'
  },

  teamNick: {
    color: primaryText,
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  text: {
    color: 'white'
  },

  grid: { marginHorizontal: -4 },

  tableTitle: {
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 12,
    padding: 6,
    fontFamily: 'Roboto-Light'
  },

  tableRowNickname: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 6
  },

  tableRowValue: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    margin: 1,
    padding: 6
  },

  tableRowText: {
    color: primaryText,
    opacity: 0.5
  },

  map: {
    width: Dimensions.get('window').width / 1.7,
    height: Dimensions.get('window').width / 1.7,
    marginRight: 8,
    opacity: 0.3
  },

  mapVictims: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.7,
    height: Dimensions.get('window').width / 1.7
  },

  victimsList: {
    width: Dimensions.get('window').width / 0.5,
    marginTop: -10
  },

  victimsCaption: {
    marginVertical: 2
  },

  victimText: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    color: primaryText,
    opacity: 0.75
  },

  victimItem: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.05)',
    padding: 4
  },

  victimNick: {
    fontSize: 12,
    color: primaryText,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  victimDesc: {
    fontSize: 8,
    color: 'gray',
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  killerDesc: {
    fontSize: 10,
    color: 'gray',
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  },

  statItem: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 3,
    margin: 4,
    padding: 8
  },

  statItemTitle: {
    color: primaryTextDark,
    fontSize: 8,
    fontFamily: 'Roboto-Light'
  },

  leaderboard: { paddingTop: 12 },

  teamItem: { marginVertical: 4 },

  teamRank: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },

  teamItemBody: { marginLeft: 8 }
})