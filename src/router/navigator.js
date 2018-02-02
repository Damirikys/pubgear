import { StackNavigator as stackNavigator } from 'react-navigation'
import slideTransition from './slideTransition'

import HomeScene from '../scenes/home'
import MatchesScene from '../scenes/matches'

export default routeName => stackNavigator({
  HomeScene: { screen: HomeScene, navigationOptions: { header: null } },
  MatchesScene: { screen: MatchesScene, navigationOptions: { header: null } }
}, {
  initialRouteName: routeName,
  transitionConfig: slideTransition
})
