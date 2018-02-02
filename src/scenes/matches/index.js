import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, Dimensions, FlatList } from 'react-native'
import Body from '../../components/Body'
import Content from '../../components/Content'
import styles from './styles'

class MatchesScene extends React.Component {
  render() {
    return (
      <Body>
        <Content>
          <FlatList
            data={this.props.matches}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <View>
                <Text>{JSON.stringify(item, null, 2)}</Text>
              </View>
            )}
          />
        </Content>
      </Body>
    )
  }
}

export default connect(state => ({
  matches: state.matches.items
}))(MatchesScene)