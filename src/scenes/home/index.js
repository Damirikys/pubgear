import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'

import Body from '../../components/Body'
import Content from '../../components/Content'

import styles from './styles'

class HomeScene extends React.Component {
  render() {
    return (
      <Body>
        <Content>
          <ScrollView style={styles.block}>
            <Text style={styles.text}>{JSON.stringify(this.props.stats, null, 2)}</Text>
          </ScrollView>
        </Content>
      </Body>
    )
  }
}

export default connect(state => ({
  stats: state.stats
}))(HomeScene)