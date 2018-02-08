import React from 'react'
import { Text, View } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { accentColor, accentTextColor, primaryText, primaryTextDark } from '../../../../constants/themeConfig'

import StatItem from './StatItem'

import localization from '../../../../localization'
import styles from '../styles'

export default class TeamItem extends React.PureComponent {
  state = {
    participants: this.props.team.participants.reduce((res, cur) =>
      `${res.length !== 0 ? `${res}, ` : ''}${cur.user.nickname}`, ''
    ),

    killsCount: this.props.team.participants.reduce((res, { stats }) => res + stats.combat.kda.kills, 0),

    damageAll: this.props.team.participants.reduce((res, { stats }) => (
      res + stats.combat.damage.damage_dealt
    ), 0),

    distance: (this.props.team.participants.reduce((res, { stats }) => (
      res + stats.combat.distance_traveled.walk_distance + stats.combat.distance_traveled.ride_distance
    ), 0) / 1000).toFixed(2) + ' ' + localization.locale.matches.km,
  }

  render() {
    const { matches } = localization.locale
    const { team, isMyTeam } = this.props
    return (
      <Grid style={styles.teamItem}>
        <Col size={0.1}>
          <View style={styles.teamRank}>
            <Text style={{ color: (isMyTeam) ? accentTextColor : primaryTextDark }}>
              {team.stats.rank}
              </Text>
          </View>
        </Col>
        <Col style={styles.teamItemBody}>
          <Text style={{
            color: (isMyTeam) ? accentColor : primaryText,
            fontFamily: 'Roboto-Light',
            opacity: (isMyTeam) ? 0.75 : 0.5,
            fontSize: (isMyTeam) ? 18 : 14
          }}>
            {this.state.participants}
          </Text>

          <Grid style={styles.grid}>
            <Row>
              <StatItem
                name={matches.deadsCount}
                size={16}
                value={this.state.killsCount}
              />
              <StatItem
                name={matches.damageCount}
                size={16}
                value={this.state.damageAll}
              />
              <StatItem
                name={matches.distPassedTitle}
                size={16}
                value={this.state.distance}
              />
            </Row>
          </Grid>
        </Col>
      </Grid>
    )
  }
}