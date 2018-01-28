import { StackNavigator as stackNavigator } from 'react-navigation'
import slideTransition from './slideTransition'

import HomeScene from '../scenes/home'

export default routeName => stackNavigator({
  HomeScene: { screen: HomeScene, navigationOptions: { header: null } },
}, {
  initialRouteName: routeName,
  transitionConfig: slideTransition
})
