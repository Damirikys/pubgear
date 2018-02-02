import { StyleSheet } from 'react-native'
import { accentColor, primaryText, primaryTextDark } from '../../constants/themeConfig'

export default StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row' },

  username: {
    color: primaryText,
    fontSize: 28,
    fontFamily: 'Roboto-Light',
    marginVertical: 8,
  },

  avatarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10
  },

  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70
  },

  ratingView: {
    backgroundColor: 'green',
    overflow: 'hidden',
    color: 'white',
    borderRadius: 10,
    paddingTop: 4,
    paddingBottom: 16,
    paddingHorizontal: 12,
    position: 'absolute',
    top: -40
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

  statBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 6
  },

  statBlockTitle: {
    fontSize: 12,
    color: primaryTextDark,
    fontFamily: 'Roboto-Bold'
  },

  statBlockValue: {
    fontSize: 28,
    color: primaryText,
    fontFamily: 'Roboto-Light'
  },

  title: {
    opacity: 0.8,
    borderLeftWidth: 4,
    borderLeftColor: accentColor,
    marginVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: -16,
    padding: 12
  },

  h2: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: accentColor,
  },

  pieChartsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 36
  },

  pieChart: {
    height: 200,
    opacity: 0.5
  },

  pieChartCaptionView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  pieChartCaptionText: {
    color: primaryText,
    fontSize: 14
  },

  lineChart: { height: 200 },

  xaxis: { paddingVertical: 16 },

  xaxisLabel: { color: 'grey' },

  ratingChart: { flexDirection: 'row', marginVertical: 16 },

  barChart: { flex: 1, marginLeft: 16, height: 200, opacity: 0.7 }
})