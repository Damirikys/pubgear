import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, ScrollView, } from 'react-native'
import { MATCHES_FETCH_ACTION } from '../../actions/matchesActions'
import { accentColor } from '../../constants/themeConfig'

import Body from '../../components/Body'
import Button from '../../components/Button'
import Content from '../../components/Content'
import MatchItem from './components/MatchItem'

class MatchesScene extends React.Component {
  _loadMatches = () => {
    const { matches } = this.props
    const { offset } = matches[matches.length - 1]
    this.props.loadMatches(offset)
  }

  render() {
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
            ) : (
              <Button
                onPress={this._loadMatches}
                text="Еще раньше"
              />
            )}
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
  loadMatches: offset => dispatch({ type: MATCHES_FETCH_ACTION, payload: offset })
}))(MatchesScene)