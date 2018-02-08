import React from 'react'

import Icon from 'react-native-vector-icons/Feather'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { TabNavigator as tabNavigator } from 'react-navigation'
import { accentColor, primaryColor, primaryText } from '../constants/themeConfig'

import localization from '../localization'
import sceneNavigator from './navigator'

const tabBarIcon = (tintColor = '#ccc') => ({
  color: tintColor,
  fontSize: 24
})

export default class Router extends React.Component {
  tabs = {
    Home: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: localization.locale.statisticsMenu,
        tabBarIcon: ({ tintColor }) => <Icon name="trending-up" style={tabBarIcon(tintColor)}/>
      }
    },
    Matches: {
      screen: sceneNavigator('MatchesScene'),
      navigationOptions: {
        tabBarLabel: localization.locale.matchesMenu,
        tabBarIcon: ({ tintColor }) => <Icon name="crosshair" style={tabBarIcon(tintColor)}/>
      }
    },
    Companions: {
      screen: sceneNavigator('CompanionsScene'),
      navigationOptions: {
        tabBarLabel: localization.locale.teammatesMenu,
        tabBarIcon: ({ tintColor }) => <Icon name="users" style={tabBarIcon(tintColor)}/>
      }
    }
  }

  navigator = () => tabNavigator({ ...this.tabs }, buildConfig('Home'))

  render() {
    const Navigator = this.navigator()
    return (
      <MenuProvider>
        <StatusBar barStyle="light-content"/>
        <Navigator/>
      </MenuProvider>
    )
  }
}

const buildConfig = routeName => ({
  initialRouteName: routeName,
  ...tabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: accentColor,
    inactiveTintColor: primaryText,
    scrollEnabled: false,
    showIcon: true,
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 12,
      fontFamily: 'Roboto-Light'
    },
    indicatorStyle: {
      backgroundColor: accentColor,
      height: 1
    },
    style: {
      backgroundColor: primaryColor,
      elevation: 12,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 5,
      shadowOpacity: 0.7
    },
    tabStyle: {
      height: 56,
    },
    iconStyle: {
      marginBottom: -4,
      marginTop: 8
    }
  }
})