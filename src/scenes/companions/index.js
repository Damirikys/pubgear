import React from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'

import Body from '../../components/Body'
import CompanionItem from './components/CompanionItem'

class CompanionsScene extends React.Component {
  render() {
    const data = this.props.companions.sort((a, b) => a.rating > b.rating ? -1 : 1)
    return (
      <Body>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <CompanionItem item={item}/>}
        />
      </Body>
    )
  }
}

export default connect(state => ({
  companions: state.companions
}))(CompanionsScene)