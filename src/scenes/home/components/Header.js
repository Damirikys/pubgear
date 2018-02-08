import React from 'react'
import { Image, Text, View } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import { accentColor, primaryText } from '../../../constants/themeConfig'
import { noavatarUrl } from '../../../constants/utils'

import localization from '../../../localization'
import styles from '../styles'

class Header extends React.PureComponent {
  render() {
    const { home } = localization.locale
    const { stats, profile } = this.props
    return (
      <Grid>
        <Row>
          <Col>
            <HeadItem
              title={home.worldPosition}
              value={stats.position}
              maxValue={stats.maxRank}
              valueSize={32}
            />
          </Col>
          <Col>
            <HeadItem
              title={home.avgRank}
              value={stats.averageRank.toFixed()}
              titleSize={12}
              valueSize={72}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HeadItem
              title={home.top1}
              value={stats.winMatchesCount}
              maxValue={stats.matchesCount}
            />
          </Col>
          <Col size={1.7}>
            <View style={styles.avatarView}>
              <Text style={styles.ratingView}>{stats.rating}</Text>
              <Image
                source={{ uri: profile.avatarUrl || noavatarUrl }}
                style={styles.avatarImage}
              />
              <Text numberOfLines={1} style={styles.username}>{profile.name}</Text>
            </View>
          </Col>
          <Col>
            <HeadItem
              title={home.top10}
              value={stats.topTenMatchesCount}
              maxValue={stats.matchesCount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HeadItem
              title={home.kills}
              value={stats.killsCount}
              valueSize={36}
            />
          </Col>
          <Col>
            <HeadItem
              title={home.assists}
              value={stats.assistsCount}
              valueSize={36}
            />
          </Col>
          <Col>
            <HeadItem
              title={home.deaths}
              value={stats.deathCount}
              valueSize={36}
            />
          </Col>
          <Col>
            <HeadItem
              title={home.kd}
              value={(stats.killsCount / stats.deathCount).toFixed(2)}
              valueSize={36}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

class HeadItem extends React.PureComponent {
  render() {
    const { title, value, maxValue } = this.props
    return (
      <View style={styles.statView}>
        <Text style={this.statTitle}>{title}</Text>
        <Text style={this.statValue}>{value}</Text>
        {Boolean(maxValue) && <Text style={this.statSub}>> {(value / maxValue * 100).toFixed(2)} %</Text>}
      </View>
    )
  }

  statTitle = {
    color: primaryText,
    fontSize: this.props.titleSize || 14,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  }

  statValue = {
    color: primaryText,
    fontSize: this.props.valueSize || 52,
    fontFamily: 'Roboto-Light',
  }

  statSub = {
    color: accentColor,
    fontSize: 12,
    fontFamily: 'Roboto-Light',
    opacity: 0.75
  }
}

export default connect(state => ({
  profile: state.profile
}))(Header)