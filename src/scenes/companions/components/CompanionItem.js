import React from 'react'
import { Text, View } from 'react-native'
import Touchable from 'react-native-touchable-safe'

import localization from '../../../localization'
import styles from '../styles'

export default class CompanionItem extends React.PureComponent {
  state = { expanded: false }

  render() {
    const { companions } = localization.locale
    const user = this.props.item
    return (
      <Touchable onPress={() => this.setState({ expanded: !this.state.expanded })}>
        <View style={(this.state.expanded) ? styles.userItemExp : styles.userItem}>
          <View style={styles.rowBetween}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRating}>{user.rating}</Text>
          </View>
          <View style={styles.rowBetween}>
            <View style={styles.rowBetween}>
              <StatItem
                name={companions.kd}
                value={(user.killsCount / user.deathCount).toFixed(2) || 0}
              />
              <StatItem
                name={companions.top1}
                value={user.winMatchesCount}
              />
              <StatItem
                name={companions.top10}
                value={`${(user.topTenMatchesCount / user.matchesCount * 100).toFixed(1) || 0}%`}
              />
              <StatItem
                name={companions.avgRank}
                value={user.averageRank.toFixed()}
              />
            </View>

            <Text style={styles.myMatches}>{user.matchesCount}</Text>
          </View>

          {this.state.expanded && (
            <View style={styles.userDetails}>
              <View style={styles.expView}>
                {this.statBlock(companions.kills, user.killsCount)}
                {this.statBlock(companions.assists, user.assistsCount)}
                {this.statBlock(companions.headshotsPercent, `${(user.headshotKillsCount / user.killsCount * 100).toFixed(2)}%`)}
                {this.statBlock(companions.maxKillsPerMatch, user.maxKillsPerMatch)}
              </View>
              <View style={styles.expView}>
                {this.statBlock(companions.avgRank, user.averageRank.toFixed())}
                {this.statBlock(companions.avgDamage, user.averageDamageDealt.toFixed())}
                {this.statBlock(companions.avgTimeSurvive, `${(user.averageTimeSurvive / 60).toFixed()} ${companions.min}`)}
              </View>
              <View style={styles.expView}>
                {this.statBlock(companions.top1.toUpperCase(), user.winMatchesCount)}
                {this.statBlock(companions.top10.toUpperCase(), user.topTenMatchesCount)}
                {this.statBlock(companions.totalMatches, user.matchesCount)}
              </View>
            </View>
          )}
        </View>
      </Touchable>
    )
  }

  statBlock = (name, value) => (
    <View style={styles.rowBetween}>
      <Text style={styles.expText}>{name.toUpperCase()}</Text>
      <Text style={styles.expValue}>{value}</Text>
    </View>
  )
}

class StatItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.statView}>
        <Text style={styles.statTitle}>{this.props.name.toUpperCase()}</Text>
        <Text style={styles.statValue}>{this.props.value}</Text>
      </View>
    )
  }
}