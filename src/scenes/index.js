import React from 'react'
import { connect } from 'react-redux'
import { REFRESH_ACTION } from '../actions/internalActions'

import Router from '../router/router'

class Main extends React.Component {
  componentWillMount() {
    this.props.refreshData()
  }

  render() {
    return (
      <Router/>
    )
  }
}

export default connect(null, dispatch => ({
  refreshData: () => dispatch({ type: REFRESH_ACTION })
}))(Main)