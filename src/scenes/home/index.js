import React from 'react'
import { connect } from 'react-redux'
import { Image, Dimensions, View } from 'react-native'

import Icon from 'react-native-vector-icons'
import Modal from 'react-native-modal'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Touchable from 'react-native-touchable-safe'

import { CLEAR_STATE_ACTION } from '../../actions/internalActions'
import { backgroundImg } from '../../constants/utils'

import Body from '../../components/Body'
import Content from '../../components/Content'
import Caption from './components/Caption'
import Header from './components/Header'
import PieCharts from './components/PieCharts'
import RecentMatchesStats from './components/RecentMatchesStats'
import StatItem from './components/StatItem'
import FilterScene from './filter'

import localization from '../../localization'
import styles from './styles'

class HomeScene extends React.Component {
  state = { filterVisible: false }

  _renderForeground = () => <Header stats={this.props.stats}/>

  _renderBackground = () => (
    <Image
      style={{ width: '100%', height: '100%', opacity: 0.085 }}
      resizeMode={Image.resizeMode.cover}
      source={{ uri: backgroundImg }}
    />
  )

  _toggleFilter = () => this.setState({ filterVisible: !this.state.filterVisible })

  _toggleExit = () => this.props.clearState()

  render() {
    const { home } = localization.locale
    const stats = this.props.stats
    if (!stats) return <Body/>

    return (
      <Body>
        <ParallaxScrollView
          parallaxHeaderHeight={Dimensions.get('window').height / 1.5}
          backgroundScrollSpeed={4}
          backgroundColor="transparent"
          contentBackgroundColor="transparent"
          renderForeground={this._renderForeground}
          renderBackground={this._renderBackground}
          renderFixedHeader={() => (
            <View style={styles.toolbar}>
              <Touchable
                onPress={this._toggleFilter}
                outerStyle={styles.settingsIcon}>
                <Icon.Feather
                  name="settings"
                  style={styles.settings}
                />
              </Touchable>
              <Touchable
                onPress={this._toggleExit}
                outerStyle={styles.accountIcon}>
                <Icon.MaterialCommunityIcons
                  name="account-convert"
                  style={styles.account}
                />
              </Touchable>
            </View>
          )}
        >
          <Content>
            <Caption name={home.generalTitle}/>

            <StatItem
              name={home.maxKillsPerMatch}
              value={stats.maxKillsPerMatch}
            />
            <StatItem
              name={home.headshotsCount}
              value={stats.headshotKillsCount}
            />
            <StatItem
              name={home.headshotsPercent}
              value={`${(stats.headshotKillsCount / stats.killsCount * 100).toFixed(2)}%`}
            />

            <PieCharts stats={stats}/>

            <StatItem
              name={home.longestKill}
              value={`${stats.longestKill.toFixed()} ${home.m}`}
            />
            <StatItem
              name={home.avgDamage}
              value={(stats.averageDamageDealt).toFixed(2)}
            />
            <StatItem
              name={home.avgTimeSurvive}
              value={`${(stats.averageTimeSurvive / 60).toFixed()} ${home.min}`}
            />
            <StatItem
              name={home.matchesCount}
              value={stats.matchesCount}
            />
            <StatItem
              name={home.kda}
              value={((stats.killsCount + stats.assistsCount) / stats.deathCount).toFixed(2)}
            />

            <RecentMatchesStats/>

            <Modal
              isVisible={this.state.filterVisible}
              onBackButtonPress={this._toggleFilter}
              useNativeDriver={true}
              style={styles.filter}>
              <FilterScene onBack={this._toggleFilter}/>
            </Modal>
          </Content>
        </ParallaxScrollView>
      </Body>
    )
  }
}

export default connect(({ stats, config, progress }) => ({
  stats: stats && stats[`${config.mode}:${config.type}`],
  progress: progress
}), dispatch => ({
  clearState: () => dispatch({ type: CLEAR_STATE_ACTION })
}))(HomeScene)