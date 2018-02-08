import React from 'react'
import moment from 'moment'

import { FlatList, ScrollView, Text, View, Image } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'

import erangel256 from '../../../../assets/images/erangel256'
import miramar256 from '../../../../assets/images/miramar256'

import { erangel, miramar } from '../../../../constants/maps'
import { accentColor } from '../../../../constants/themeConfig'
import { modeOf, typeOf } from '../../../../constants/utils'

import Caption from './Caption'
import StatItem from './StatItem'
import TeamItem from './TeamItem'

import localization from '../../../../localization'
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
    const { matches } = localization.locale
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

                {myKiller && <View style={this.styleOfVictim(myKiller.victim.position, accentColor)} />}
              </View>
            </View>

            <View style={styles.victimsList}>
              {myVictims.length !== 0 && (
                <Caption
                  style={styles.victimsCaption}
                  styleText={styles.victimText}
                  title={matches.deads}>
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
                  title={matches.dead}>
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
            <Caption title={matches.aboutTeam}>
              <Grid>
                <Col>
                  <Row>
                    <Text style={styles.tableTitle}>{' '}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.killsTitle}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.assistsTitle}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.damageTitle}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.knockdownsTitle}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.distPassedTitle}</Text>
                  </Row>
                  <Row>
                    <Text style={styles.tableTitle}>{matches.aliveTitle}</Text>
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
                      <Text style={styles.tableRowText}>{this.computeSumDistance(stats.combat)} {matches.km}</Text>
                    </Row>
                    <Row style={styles.tableRowValue}>
                      <Text style={styles.tableRowText}>{this.computeTimeSurvive(stats.combat)} {matches.min}</Text>
                    </Row>
                  </Col>
                ))}
              </Grid>
            </Caption>
          )}

          <Caption title={matches.fightTitle}>
            <Grid style={styles.grid}>
              <Row>
                <Col size={0.75}>
                  <StatItem
                    name={matches.killshead}
                    value={`${kda.kills} / ${kda.headshot_kills}`}
                  />
                </Col>
                <Col size={0.85}>
                  <StatItem
                    name={matches.topKillPlace}
                    value={combat.kill_place}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.maxDistKill}
                    value={`${kda.longest_kill.toFixed(1)} ${matches.m}`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <StatItem
                    name={matches.roadKills}
                    value={kda.road_kills}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.vehicleDestroys}
                    value={combat.vehicle_destroys}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.weaponAcquired}
                    value={combat.weapon_acquired}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <StatItem
                    name={matches.damageDealt}
                    value={`${damage.damage_dealt.toFixed(2)}`}
                  />
                </Col>
              </Row>
            </Grid>
          </Caption>

          <Caption title={matches.supportTitle}>
            <Grid style={styles.grid}>
              <Row>
                <Col>
                  <StatItem
                    name={matches.assistsTitle}
                    value={kda.assists}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.knockdownsTitle}
                    value={dbno.knock_downs}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.revivesTitle}
                    value={dbno.revives}
                  />
                </Col>
                <Col>
                  <StatItem
                    name={matches.teamkillTitle}
                    value={kda.team_kills}
                  />
                </Col>
              </Row>
            </Grid>
          </Caption>

          <Caption title={matches.surviveTitle}>
            <Grid style={styles.grid}>
              <Col>
                <Row>
                  <StatItem
                    name={matches.timeSurvive}
                    size={36}
                    value={`${this.computeTimeSurvive(combat)} ${matches.min}`}
                  />
                </Row>
              </Col>
              <Col>
                <StatItem
                  name={matches.heals}
                  value={combat.heals}
                />
                <StatItem
                  name={matches.boosts}
                  value={combat.boosts}
                />
              </Col>
            </Grid>
          </Caption>

          <Caption title={matches.distPassedTitle}>
            <Grid style={styles.grid}>
              <Col>
                <StatItem
                  name={matches.walkDistance}
                  size={24}
                  value={`${this.formatDistance(distance_traveled.walk_distance)} ${matches.km}`}
                />
                <StatItem
                  name={matches.roadDistance}
                  size={24}
                  value={`${this.formatDistance(distance_traveled.ride_distance)} ${matches.km}`}
                />
              </Col>
              <Col>
                <StatItem
                  name={matches.allDistance}
                  size={32}
                  value={`${this.computeSumDistance({ distance_traveled })} ${matches.km}`}
                />
              </Col>
            </Grid>
          </Caption>

          <Caption title={matches.leaderboard}>
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