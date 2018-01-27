import React from 'react'

import Icon from 'react-native-vector-icons/Feather'
import { StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { TabNavigator as tabNavigator } from 'react-navigation'
import { accentColor, primaryColor, primaryText } from '../constants/themeConfig'

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
        tabBarLabel: 'Статистика',
        tabBarIcon: ({ tintColor }) => <Icon name="trending-up" style={tabBarIcon(tintColor)}/>
      }
    },
    Matches: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Матчи',
        tabBarIcon: ({ tintColor }) => <Icon name="crosshair" style={tabBarIcon(tintColor)}/>
      }
    },
    Companions: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Напарники',
        tabBarIcon: ({ tintColor }) => <Icon name="users" style={tabBarIcon(tintColor)}/>
      }
    },
    Leaderboard: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Таблица лидеров',
        tabBarIcon: ({ tintColor }) => <Icon name="globe" style={tabBarIcon(tintColor)}/>
      }
    },
    Wiki: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Wiki',
        tabBarIcon: ({ tintColor }) => <Icon name="info" style={tabBarIcon(tintColor)}/>
      }
    },
    News: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Новости',
        tabBarIcon: ({ tintColor }) => <Icon name="file-text" style={tabBarIcon(tintColor)}/>
      }
    },
    Posts: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Блоги',
        tabBarIcon: ({ tintColor }) => <Icon name="radio" style={tabBarIcon(tintColor)}/>
      }
    },
    Calcs: {
      screen: sceneNavigator('HomeScene'),
      navigationOptions: {
        tabBarLabel: 'Сервисы',
        tabBarIcon: ({ tintColor }) => <Icon name="cpu" style={tabBarIcon(tintColor)}/>
      }
    }
  }

  navigator = () => tabNavigator({ ...this.tabs }, buildConfig('Home'))

  render() {
    const Navigator = this.navigator()
    return (
      <MenuProvider>
        <StatusBar barStyle="dark-content"/>
        <Navigator/>
      </MenuProvider>
    )
  }
}

const buildConfig = routeName => ({
  initialRouteName: routeName,
  ...tabNavigator.Presets.AndroidTopTabs,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: accentColor,
    inactiveTintColor: primaryText,
    scrollEnabled: true,
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
      marginTop: 4
    }
  }
})