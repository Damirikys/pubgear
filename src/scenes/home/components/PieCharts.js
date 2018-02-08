import React from 'react'
import { Text, View } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { accentColor, endGradientColor } from '../../../constants/themeConfig'

import localization from '../../../localization'
import styles from '../styles'

const colorBox = (color = 'white') => ({
  width: 15,
  height: 15,
  backgroundColor: color,
  borderRadius: 5,
  marginHorizontal: 6,
  marginVertical: 1
})

export default class PieCharts extends React.PureComponent {
  state = {
    matches: [
      {
        value: this.props.stats.matchesCount - (this.props.stats.winMatchesCount + this.props.stats.topTenMatchesCount),
        color: endGradientColor,
        key: 'total matches count'
      },
      {
        value: this.props.stats.winMatchesCount,
        color: 'green',
        key: 'win matches count'
      },
      {
        value: this.props.stats.topTenMatchesCount,
        color: accentColor,
        key: 'top ten matches count'
      },
    ],

    kills: [
      {
        value: this.props.stats.killsCount - this.props.stats.headshotKillsCount,
        color: endGradientColor,
        key: 'total kills count'
      },
      {
        value: this.props.stats.headshotKillsCount,
        color: accentColor,
        key: 'headshot kills count'
      }
    ]
  }

  render() {
    const { kills, matches } = this.state
    const { home } = localization.locale
    return (
      <View style={styles.pieChartsView}>
        <View style={styles.flex}>
          <PieChart
            style={styles.pieChart}
            innerRadius={15}
            outerRadius={80}
            data={kills}
          />
          <View style={styles.pieChartCaptionView}>
            <View>
              <View style={styles.row}>
                <View style={colorBox(accentColor)}/>
                <Text style={styles.pieChartCaptionText}>{home.headshots}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.flex}>
          <PieChart
            style={styles.pieChart}
            innerRadius={15}
            outerRadius={80}
            data={matches}
          />
          <View style={styles.pieChartCaptionView}>
            <View>
              <View style={styles.row}>
                <View style={colorBox(accentColor)}/>
                <Text style={styles.pieChartCaptionText}>{home.top10}</Text>
              </View>
              <View style={styles.row}>
                <View style={colorBox('green')}/>
                <Text style={styles.pieChartCaptionText}>{home.top1}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}