import React from 'react'
import { Text, View } from 'react-native'
import Touchable from 'react-native-touchable-safe'
import moment from 'moment'
import 'moment/locale/ru'
import { modeOf, typeOf } from '../../../constants/utils'
import styles from '../styles'

export default class MatchItem extends React.PureComponent {
  render() {
    const { match } = this.props
    const { stats } = match.participant
    const { combat } = stats
    return (
      <Touchable onPress={() => this.props.onPress(stats)} outerStyle={this.outerStyle(stats.rank)}>
        <View>
          <View style={styles.rowBetween}>
            <Text style={styles.fromNow}>{moment(match.started_at).fromNow()}</Text>
            <Text style={styles.typeMode}>{modeOf(match.mode)} {typeOf(match.queue_size)}</Text>
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Text style={styles.rank}>{stats.rank}</Text>
              <Text style={styles.maxRank}>/{match.total_rank}</Text>
            </View>
            <Text style={this.ratingStyle(stats.rating_delta)}>
              {stats.rating_delta > 0 && '+'}{stats.rating_delta.toFixed()}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Block
              name="время жизни"
              value={`${(combat.time_survived / 60).toFixed()} мин.`}
            />
            <Block
              name="убийств/в голову"
              value={`${combat.kda.kills}/${combat.kda.headshot_kills}`}
            />
            <Block
              name="ассистов"
              value={combat.kda.assists}
            />
            <Block
              name="урон"
              value={combat.damage.damage_dealt.toFixed()}
            />
            <Block
              name="дистанция"
              value={`${((combat.distance_traveled.walk_distance + combat.distance_traveled.ride_distance) / 1000).toFixed(1)} км`}
            />
          </View>
        </View>
      </Touchable>
    )
  }

  outerStyle = rank => ({
    backgroundColor: rank > 10 ? 'rgba(46, 44, 55, 0.2)' : rank === 1 ? 'rgba(215, 210, 5, 0.1)' : 'rgba(70, 180, 40, 0.1)',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4
  })

  ratingStyle = delta => ({
    opacity: 0.8,
    color: delta > 0 ? 'green' :  delta < 0 ? 'red' : 'gray',
    fontFamily: 'Roboto-Light',
    fontSize: 24
  })
}

class Block extends React.PureComponent {
  render() {
    const { name, value } = this.props
    return (
      <View>
        <Text style={styles.blockName}>{name}</Text>
        <Text style={styles.blockValue}>{value}</Text>
      </View>
    )
  }
}