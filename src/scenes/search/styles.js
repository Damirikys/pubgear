import { Dimensions, StyleSheet } from 'react-native'
import { primaryLight, primaryText } from '../../constants/themeConfig';

export default StyleSheet.create({
  logoWrapper: { flex: 1, justifyContent: 'center' },
  logo: { marginVertical: 30, alignItems: 'center', marginTop: -100 },
  viewedText: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    color: primaryLight,
    marginLeft: 16,
    marginTop: 16,
    opacity: 0.5
  },

  logoImg: { width: Dimensions.get('window').width / 1.75, height: 70 },

  searchInput: {
    width: '100%',
    height: 60,
    paddingVertical: 16,
    paddingLeft: 30,
    paddingRight: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    fontSize: 24,
    fontFamily: 'Roboto-Light',
    color: primaryText
  },

  searchButton: { position: 'absolute', right: 15, top: 15 },
  searchIcon: { color: '#a87220', fontSize: 30 },

  lastViewed: { flexDirection: 'row', marginHorizontal: 12, marginVertical: 8 },

  queryView: { flexDirection: 'row', marginHorizontal: 4, backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 8, borderRadius: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  queryName: { fontSize: 18, color: primaryText, margin: 6 },

  copyright: { position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 16, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 4, opacity: 0.15 },
  copyrightText: { color: primaryText, fontSize: 8, fontFamily: 'Roboto-Light' }
})
