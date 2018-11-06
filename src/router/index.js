import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { dark04, light } from '../theme/colors'
import Login from '../pages/login'
import Home from '../pages/home'
import Browser from '../pages/browser'
import Mine from '../pages/mine'
import Info from '../pages/info'
import Feedback from '../pages/feedback'
import About from '../pages/about'
import Pay from '../pages/pay'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import { Avatar, Assets } from 'react-native-ui-lib'
Assets.loadAssetsGroup('icons', {
  ic_back: require('../assets/icons/ic_back.png')
})
export default createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: '登录'
    })
  },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null
    })
  },
  Mine: {
    screen: Mine,
    navigationOptions: () => ({
      title: '我的'
    })
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: () => ({
      title: '反馈'
    })
  },
  Pay: {
    screen: Pay,
    navigationOptions: () => ({
      title: '开通升学卡'
    })
  },
  About: {
    screen: About,
    navigationOptions: () => ({
      title: '关于'
    })
  },
  Info: {
    screen: Info
  },
  Browser: {
    screen: Browser,
    navigationOptions: () => ({
      header: null
    })
  }
},
{
  navigationOptions: ({ navigation, screenProps }) => ({
    gesturesEnabled: true,
    headerLeft: <Avatar imageSource={Assets.icons.ic_back} resizeMode='cover' backgroundColor='transparent' containerStyle={{ marginLeft: 15, width: 24, height: 24 }} imageStyle={{ width: 24, height: 24 }} onPress={() => navigation.goBack()} />,
    headerStyle: {
      height: 44 + screenProps.statusBarHeight,
      paddingTop: screenProps.statusBarHeight,
      // borderBottomColor: gray,
      elevation: 0,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
      color: dark04
    }
  }),
  headerLayoutPreset: 'center',
  cardStyle: {
    backgroundColor: light
  },
  initialRouteName: 'Home',
  /* initialRouteParams: {
        type: 'complete'
      }, */
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
})
