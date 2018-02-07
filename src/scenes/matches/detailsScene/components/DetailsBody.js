import React from 'react'
import moment from 'moment/moment'
import 'moment/locale/ru'

import { FlatList, ScrollView, Text, View } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'

import erangel256 from '../../../../assets/images/erangel256'
import miramar256 from '../../../../assets/images/miramar256'

import { erangel, miramar } from '../../../../constants/maps'
import { accentColor } from '../../../../constants/themeConfig'
import { modeOf, typeOf } from '../../../../constants/utils'

import Caption from './Caption'
import StatItem from './StatItem'
import TeamItem from './TeamItem'

import styles from '../styles'

export default class DetailsBody extends React.PureComponent {
  selectMapImage = map => {
    switch (map) {
      case erangel: return erangel256
      case miramar: return miramar256
    }
  }

  styleOfVictim = (position, color = 'red') => ({
    left: `${(position.x / 820000) * 100}%`,
    top: `${(position.y / 820000) * 100}%`,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: color
  })

  computeSumDistance = ({ distance_traveled }) => this.formatDistance(
    distance_traveled.walk_distance + distance_traveled.ride_distance
  )

  formatDistance = distance => (distance / 1000).toFixed(2)

  computeTimeSurvive = ({ time_survived }) => (
    time_survived / 60
  ).toFixed()

  render() {
    const { stats, team, teams, match, profile } = this.props
    const { combat } = stats
    const { kda, distance_traveled, damage, dbno } = combat

    const myKiller = match.deaths.find(x => x.victim.user.nickname === profile.name)
    const myVictims = match.deaths.filter(x => x.killer && x.killer.user.nickname === profile.name)

    return (
      <ScrollView>
        <View>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Text style={styles.rankText}>{stats.rank}</Text>
              <Text style={styles.rankAllText}>/{teams.length}</Text>
              <View style={styles.typeModeView}>
                <Text style={styles.modeType}>{modeOf(match.mode)} {typeOf(match.queue_size)}</Text>
                <Text style={styles.fromNow}>{moment(match.started_at).fromNow()}</Text>
              </View>
            </View>
            <View style={styles.teamView}>
              <FlatList
                data={team.participants}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
                renderItem={({ item }) => <Text style={styles.teamNick}>{item.user.nickname}</Text>}
              />
            </View>
          </View>

          <View style={styles.rowBetween}>
            <View>
              <Image
                style={styles.map}
                source={{ uri: this.selectMapImage(match.map_id) }}
              />

              <View style={styles.mapVictims}>
                {myVictims.map(({ victim }, index) => (
                  <View
                    key={index}
                    style={this.styleOfVictim(victim.position)} />
                ))}

                {[myKiller].map(({ victim }, index) =>
                  <View
                    key={index}
                    style={this.styleOfVictim(victim.position, accentColor)} />
                )}
              </View>
            </View>

            <View style={styles.victimsList}>
              {myVictims.length !== 0 && (
                <Caption
                  style={styles.victimsCaption}
                  styleText={styles.victimText}
                  title="Убиты">
                  <FlatList
                    data={myVictims}
                    keyExtractor={(item, index) => index}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <View style={styles.victimItem}>
                        <Text style={styles.victimNick}>{item.victim.user.nickname}</Text>
                        <Text style={styles.victimDesc}>{item.description}</Text>
                      </View>
                    )}
                  />
                </Caption>
              )}

              {myKiller && (
                <Caption
                  style={styles.victimsCaption}
                  styleText={styles.victimText}
                  title="Смерть">
                  <View style={styles.victimItem}>
                    {myKiller.killer ? (
                      <View>
                        <Text style={styles.victimNick}>{myKiller.killer.user.nickname}</Text>
                        <Text style={styles.victimDesc}>{myKiller.description.toLowerCase()}</Text>
                      </View>
                    ) : (
                      <Text style={styles.killerDesc}>{myKiller.description.toLowerCase()}</Text>
                    )}
                  </View>
                </Caption>
              )}
            </View>
          </View>

          {team.participants.length > 1 && (
            <Caption title="По команде">
              <Grid>
                <Col>
                  <Row>
                    <Text style={styles.tableTitle}>{' '}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>Убийства</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>Ассисты</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>Урон</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>Вырублено</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>Пройдено</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>В живых</Text>
                  </Row>
                </Col>
                {team.participants.map(({ user, stats }, index) => (
                  <Col key={index}>
                    <Row style={styles.tableRowNickname}>
                      <Text style={styles.tableRowText} numberOfLines={1} ellipsizeMode="tail">{user.nickname}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{stats.combat.kda.kills}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{stats.combat.kda.assists}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{stats.combat.damage.damage_dealt}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{stats.combat.dbno.knock_downs}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{this.computeSumDistance(stats.combat)} км.</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{this.computeTimeSurvive(stats.combat)} мин.</Text>
                    </Row>
                  </Col>
                ))}
              </Grid>
            </Caption>
          )}

          <Caption title="Бой">
            <Grid style={styles.grid}>
              <Row>
                <Col size={0.75}>
                  <StatItem
                    name="убийств / в голову"
                    value={`${kda.kills} / ${kda.headshot_kills}`}
                  />
                </Col>
                <Col size={0.85}>
                  <StatItem
                    name="ТОП по убийствам"
                    value={combat.kill_place}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Макс. расстояние убийства"
                    value={`${kda.longest_kill.toFixed(1)} м`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <StatItem
                    name="Убийств на машине"
                    value={kda.road_kills}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Разрушено транспорта"
                    value={combat.vehicle_destroys}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Оружия подобрано"
                    value={combat.weapon_acquired}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <StatItem
                    name="Нанесенный урон"
                    value={`${damage.damage_dealt.toFixed(2)} у.е.`}
                  />
                </Col>
              </Row>
            </Grid>
          </Caption>

          <Caption title="Поддержка">
            <Grid style={styles.grid}>
              <Row>
                <Col>
                  <StatItem
                    name="Ассистов"
                    value={kda.assists}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Вырублено"
                    value={dbno.knock_downs}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Поднятно"
                    value={dbno.revives}
                  />
                </Col>
                <Col>
                  <StatItem
                    name="Убийств своих"
                    value={kda.team_kills}
                  />
                </Col>
              </Row>
            </Grid>
          </Caption>

          <Caption title="Выживание">
            <Grid style={styles.grid}>
              <Col>
                <Row>
                  <StatItem
                    name="Время жизни"
                    size={36}
                    value={`${this.computeTimeSurvive(combat)} мин.`}
                  />
                </Row>
              </Col>
              <Col>
                <StatItem
                  name="Хилы"
                  value={combat.heals}
                />
                <StatItem
                  name="Бусты"
                  value={combat.boosts}
                />
              </Col>
            </Grid>
          </Caption>

          <Caption title="Пройдено">
            <Grid style={styles.grid}>
              <Col>
                <StatItem
                  name="Пешком"
                  size={24}
                  value={`${this.formatDistance(distance_traveled.walk_distance)} км.`}
                />
                <StatItem
                  name="На транспорте"
                  size={24}
                  value={`${this.formatDistance(distance_traveled.ride_distance)} км.`}
                />
              </Col>
              <Col>
                <StatItem
                  name="Вся дистанция"
                  size={32}
                  value={`${this.computeSumDistance({ distance_traveled })} км.`}
                />
              </Col>
            </Grid>
          </Caption>

          <Caption title="Таблица лидеров">
            <FlatList
              data={teams}
              style={styles.leaderboard}
              keyExtractor={item => item._id}
              scrollEnabled={false}
              renderItem={({ item }) =>
                <TeamItem
                  isMyTeam={team._id === item._id}
                  team={item}
              />}
            />
          </Caption>
        </View>
      </ScrollView>
    )
  }
}