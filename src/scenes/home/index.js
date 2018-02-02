import React from 'react'
import { connect } from 'react-redux'
import { Image, Dimensions } from 'react-native'

import { PROFILE_SEARCH_ACTION } from '../../actions/profileActions'

import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Body from '../../components/Body'
import Content from '../../components/Content'
import Caption from './components/Caption'
import Header from './components/Header'
import PieCharts from './components/PieCharts'
import RecentMatchesStats from './components/RecentMatchesStats'
import StatItem from './components/StatItem'

class HomeScene extends React.Component {
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

          </Content>
        </ParallaxScrollView>
      </Body>
    )
  }
}

export default connect(state => ({
  stats: state.stats && state.stats['fpp:4']
}), dispatch => ({
  searchPlayer: payload => dispatch({ type: PROFILE_SEARCH_ACTION, payload })
}))(HomeScene)