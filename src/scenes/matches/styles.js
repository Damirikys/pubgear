import { StyleSheet } from 'react-native'
import { accentColor, primaryColor, primaryLight, primaryText } from '../../constants/themeConfig'

export default StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },

  fromNow: {
    color: 'gray',
    fontFamily: 'Roboto-Regular',
    fontSize: 12
  },

  typeMode: {
    color: 'gray',
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    opacity: 0.5
  },

  rank: {
    color: 'white',
    fontFamily: 'Roboto-Light',
    fontSize: 36
  },

  maxRank: {
    color: 'gray',
    fontFamily: 'Roboto-Light',
    fontSize: 18
  },

  blockName: {
    color: '#62626f',
    fontSize: 10,
    fontFamily: 'Roboto-Light'
  },

  blockValue: {
    color: '#9b9b9b',
    fontSize: 18,
    fontFamily: 'Roboto-Regular'
  }
})