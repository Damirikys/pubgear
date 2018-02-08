import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, ScrollView, Text } from 'react-native'
import { FETCH_MATCHES_ACTION } from '../../actions/matchesActions'
import { accentColor } from '../../constants/themeConfig'

import Body from '../../components/Body'
import Button from '../../components/Button'
import Content from '../../components/Content'
import MatchItem from './components/MatchItem'

import localization from '../../localization'
import styles from './styles'

class MatchesScene extends React.Component {
  _loadMatches = () => {
    const { matches } = this.props
    const { offset } = matches[matches.length - 1]
    this.props.loadMatches(offset)
  }

  render() {
    const { matches } = localization.locale
    return (
      <Body>
        <ScrollView>
          <Content>
            <FlatList
              data={this.props.matches}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <MatchItem
                onPress={(stats) => this.props.navigation.navigate('MatchDetailsScene', { match: item, stats })}
                match={item}
              />}
            />

            {this.props.status ? (
              <ActivityIndicator
                style={{ marginVertical: 16 }}
                color={accentColor} />
            ) : this.props.matches.length !== 0 ? (
              <Button
                onPress={this._loadMatches}
                text={matches.evenEarlier}
              />
            ) : <Text style={styles.nodata}>{matches.noDataAboutMatches}</Text>}
          </Content>
        </ScrollView>
      </Body>
    )
  }
}

export default connect(state => ({
  matches: state.matches.items,
  status: state.matches.status
}), dispatch => ({
  loadMatches: offset => dispatch({ type: FETCH_MATCHES_ACTION, payload: offset })
}))(MatchesScene)