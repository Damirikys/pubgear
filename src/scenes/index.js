import React from 'react'

import { View, Text } from 'react-native'

import API from '../api'

export default class Main extends React.Component {
  state = { user_id: 'нет данных по user_id', stats: null }

  async componentDidMount() {
    const userId = await API.playerIdByName('JeMinay')
    if (userId) {
      const stats = await API.rankedStatsById(userId)
      this.setState({ user_id: userId, stats })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Text>{this.state.user_id}</Text>
        <Text>{JSON.stringify(this.state.stats, null, 2)}</Text>
      </View>
    )
  }
}
