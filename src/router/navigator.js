import { StackNavigator as stackNavigator } from 'react-navigation'
import slideTransition from './slideTransition'

import HomeScene from '../scenes/home'
import MatchesScene from '../scenes/matches'
import MatchDetailsScene from '../scenes/matches/detailsScene'

export default routeName => stackNavigator({
  HomeScene: { screen: HomeScene, navigationOptions: { header: null } },
  MatchesScene: { screen: MatchesScene, navigationOptions: { header: null } },
  MatchDetailsScene: { screen: MatchDetailsScene, navigationOptions: { header: null } },
}, {
  initialRouteName: routeName,
  transitionConfig: slideTransition
})
