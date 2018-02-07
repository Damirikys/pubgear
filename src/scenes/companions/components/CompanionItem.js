import React from 'react'
import { Text, View } from 'react-native'
import Touchable from 'react-native-touchable-safe'

import styles from '../styles'

export default class CompanionItem extends React.PureComponent {
  state = { expanded: false }

  render() {
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
                name="k/d"
                value={(user.killsCount / user.deathCount).toFixed(2) || 0}
              />
              <StatItem
                name="топ 1"
                value={user.winMatchesCount}
              />
              <StatItem
                name="топ 10"
                value={`${(user.topTenMatchesCount / user.matchesCount * 100).toFixed(1) || 0}%`}
              />
              <StatItem
                name="среднее место"
                value={user.averageRank.toFixed()}
              />
            </View>

            <Text style={styles.myMatches}>{user.matchesCount}</Text>
          </View>

          {this.state.expanded && (
            <View style={styles.userDetails}>
              <View style={styles.expView}>
                {this.statBlock('Убийств', user.killsCount)}
                {this.statBlock('Ассистов', user.assistsCount)}
                {this.statBlock('% хедшотов', `${(user.headshotKillsCount / user.killsCount * 100).toFixed(2)}%`)}
                {this.statBlock('Макс. убийств за матч', user.maxKillsPerMatch)}
              </View>
              <View style={styles.expView}>
                {this.statBlock('Средний ранг', user.averageRank.toFixed())}
                {this.statBlock('Средний урон', user.averageDamageDealt.toFixed())}
                {this.statBlock('Среднее время жизни', `${(user.averageTimeSurvive / 60).toFixed()} мин.`)}
              </View>
              <View style={styles.expView}>
                {this.statBlock('ТОП 1', user.winMatchesCount)}
                {this.statBlock('ТОП 10', user.topTenMatchesCount)}
                {this.statBlock('Всего матчей', user.matchesCount)}
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