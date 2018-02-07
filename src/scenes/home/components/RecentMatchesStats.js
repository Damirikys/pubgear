import React from 'react'
import { View } from 'react-native';
import { BarChart, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { connect } from 'react-redux'
import { accentColor, accentColorDark, primaryLight } from '../../../constants/themeConfig'

import Caption from './Caption'
import StatItem from './StatItem'

import styles from '../styles'

class RecentMatchesStats extends React.PureComponent {
  render() {
    const { summary } = this.props
    if (!summary) return null

    const barData = [{
      values: summary.ranks_list.map(x => 100 - x),
      positive: { fill: accentColor },
      negative: { fill: primaryLight }
    }]

    return (
      <View>
        <Caption name="За последние 20 матчей"/>

        <StatItem
          name="Выиграно матчей"
          value={summary.win_matches_cnt}
        />
        <StatItem
          name="Попаданий в ТОП 10"
          value={summary.topten_matches_cnt}
        />
        <StatItem
          name="Среднее место в матче"
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
          name="Среднее кол-во убийств за матч"
          value={summary.kills_avg.toFixed(2)}
        />
        <StatItem
          name="Среднее кол-во смертей за матч"
          value={summary.deaths_avg.toFixed(2)}
        />
        <StatItem
          name="Средний урон за матч"
          value={summary.damage_avg.toFixed(2)}
        />
        <StatItem
          name="Среднее время выживания"
          value={`${(summary.time_survived_avg / 60).toFixed()} мин.`}
        />
        <StatItem
          name="Максимум убийств за матч"
          value={summary.kills_max}
        />

        <Caption name="Изменения рейтинга"/>

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
          name="Всего"
          value={summary.rating_data.reduce((r, c) => r + c).toFixed(2)}
        />

      </View>
    )
  }
}

export default connect(state => ({
  summary: state.matches.summary
}))(RecentMatchesStats)