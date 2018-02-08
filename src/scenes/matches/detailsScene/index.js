import React from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { FETCH_MATCH_ACTION } from '../../../actions/matchesActions'

import Body from '../../../components/Body'
import Content from '../../../components/Content'
import DetailsBody from './components/DetailsBody'

class DetailsScene extends React.Component {
  componentWillMount() {
    if (!this.props.match) {
      const { match } = this.props.navigation.state.params
      this.props.fetchMatchDetails(match.match_id)
    }
  }

  render() {
    const { match, teamId, stats, profile } = this.props
    const teams = ((match && match.teams) || []).sort((a, b) => a.stats.rank > b.stats.rank ? 1 : -1)
    const team = teams.find(x => String(x._id) === String(teamId))

    return (
      <Body>
        <ScrollView>
          <Content>
            {this.props.match && (
              <DetailsBody
                team={team}
                match={match}
                stats={stats}
                teams={teams}
                profile={profile}
              />
            )}
          </Content>
        </ScrollView>
      </Body>
    )
  }
}

export default connect((state, { navigation }) => ({
  match: state.matches.data[navigation.state.params.match.match_id],
  teamId: navigation.state.params.match.team._id,
  stats: navigation.state.params.stats,
  profile: state.profile
}), dispatch => ({
  fetchMatchDetails: matchId => dispatch({ type: FETCH_MATCH_ACTION, payload: matchId })
}))(DetailsScene)