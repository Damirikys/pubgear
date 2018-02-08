import React from 'react'
import { View } from 'react-native';
import { BarChart, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { connect } from 'react-redux'
import { accentColor, accentColorDark, primaryLight } from '../../../constants/themeConfig'

import Caption from './Caption'
import StatItem from './StatItem'

import localization from '../../../localization'
import styles from '../styles'

class RecentMatchesStats extends React.PureComponent {
  render() {
    const { summary } = this.props
    if (!summary || summary.matches_cnt === 0) return null

    const barData = [{
      values: summary.ranks_list.map(x => 100 - x),
      positive: { fill: accentColor },
      negative: { fill: primaryLight }
    }]

    const { home } = localization.locale

    return (
      <View>
        <Caption name={home.last20matches}/>

        <StatItem
          name={home.winMatches}
          value={summary.win_matches_cnt}
        />
        <StatItem
          name={home.enterTop10}
          value={summary.topten_matches_cnt}
        />
        <StatItem
          name={home.avgRankMatch}
          value={summary.ranks_avg.toFixed(2)}
        />

        <View>
          <BarChart
            style={styles.barChart}
            data={barData}
          />

          <XAxis
            style={styles.xaxis}
            values={summary.ranks_list}
            contentInset={{ left: 10, right: 10 }}
            formatLabel={value => value}
            chartType={XAxis.Type.LINE}
            labelStyle={styles.xaxisLabel}
          />
        </View>

        <StatItem
          name={home.avgKillsMatch}
          value={summary.kills_avg.toFixed(2)}
        />
        <StatItem
          name={home.avgDeathsMatch}
          value={summary.deaths_avg.toFixed(2)}
        />
        <StatItem
          name={home.avgDamageMatch}
          value={summary.damage_avg.toFixed(2)}
        />
        <StatItem
          name={home.avgTimeSurviveMatch}
          value={`${(summary.time_survived_avg / 60).toFixed()} ${home.min}`}
        />
        <StatItem
          name={home.maxKillsPerMatch}
          value={summary.kills_max}
        />

        <Caption name={home.ratingChangeTitle}/>

        <View style={styles.ratingChart}>
          <YAxis
            dataPoints={summary.rating_data}
            labelStyle={styles.xaxisLabel}
            formatLabel={value => value}
          />
          <LineChart
            style={styles.lineChart}
            dataPoints={summary.rating_data}
            shadowOffset={1}
            svg={{ stroke: accentColor }}
            shadowSvg={{
              stroke: accentColorDark,
              strokeWidth: 4,
            }}
            contentInset={{ left: 10 }}
            curve={shape.curveLinear}
          />
        </View>

        <StatItem
          name={home.total}
          value={summary.rating_data.reduce((r, c) => r + c).toFixed(2)}
        />

      </View>
    )
  }
}

export default connect(state => ({
  summary: state.matches.summary
}))(RecentMatchesStats)