import React from 'react'
import Touchable from 'react-native-touchable-safe';
import { connect } from 'react-redux'
import { Image, Dimensions, View } from 'react-native'

import Icon from 'react-native-vector-icons'
import Modal from 'react-native-modal'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { SEARCH_PROFILE_ACTION } from '../../actions/profileActions'

import Body from '../../components/Body'
import Content from '../../components/Content'
import Caption from './components/Caption'
import Header from './components/Header'
import PieCharts from './components/PieCharts'
import RecentMatchesStats from './components/RecentMatchesStats'
import StatItem from './components/StatItem'
import FilterScene from './filter';

import styles from './styles'

class HomeScene extends React.Component {
  state = { filterVisible: false }

  componentDidMount() {
    this.props.searchPlayer('JeMinay')
  }

  _renderForeground = () => <Header stats={this.props.stats}/>

  _renderBackground = () => (
    <Image
      style={{ width: '100%', height: '100%', opacity: 0.085 }}
      resizeMode={Image.resizeMode.cover}
      source={{ uri: 'http://image.ibb.co/c7VMJm/erangel.png' }}
    />
  )

  _toggleFilter = () => this.setState({ filterVisible: !this.state.filterVisible })

  render() {
    const stats = this.props.stats
    if (!stats) return null
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
              <Touchable outerStyle={styles.settingsIcon}>
                <Icon.Feather
                  name="settings"
                  style={styles.settings}
                  onPress={this._toggleFilter}
                />
              </Touchable>
              <Touchable outerStyle={styles.accountIcon}>
                <Icon.MaterialCommunityIcons
                  name="account-convert"
                  style={styles.account}
                  onPress={() => alert('account')}
                />
              </Touchable>
            </View>
          )}
        >
          <Content>
            <Caption name="Общая сводка"/>

            <StatItem
              name="Максимум убийств за матч"
              value={stats.maxKillsPerMatch}
            />
            <StatItem
              name="Количество хедшотов"
              value={stats.headshotKillsCount}
            />
            <StatItem
              name="Процент хедшотов"
              value={`${(stats.headshotKillsCount / stats.killsCount * 100).toFixed(2)}%`}
            />

            <PieCharts stats={stats}/>

            <StatItem
              name="Самый дальний выстрел"
              value={`${stats.longestKill.toFixed()} метров`}
            />
            <StatItem
              name="Средний наносимый урон"
              value={(stats.averageDamageDealt).toFixed(2)}
            />
            <StatItem
              name="Среднее время жизни"
              value={`${(stats.averageTimeSurvive / 60).toFixed()} мин.`}
            />
            <StatItem
              name="Всего сыграно матчей"
              value={stats.matchesCount}
            />
            <StatItem
              name="KDA рейтинг"
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

export default connect(({ stats, config }) => ({
  stats: stats && stats[`${config.mode}:${config.type}`]
}), dispatch => ({
  searchPlayer: payload => dispatch({ type: SEARCH_PROFILE_ACTION, payload })
}))(HomeScene)