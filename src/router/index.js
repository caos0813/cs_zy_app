import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { PixelRatio } from 'react-native'
import { dark04, gray, light } from '../theme/colors'
import Login from '../pages/login'
import Home from '../pages/home'
import Browser from '../pages/browser'
import Mine from '../pages/mine'
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
      borderBottomColor: gray,
      elevation: 0,
      borderBottomWidth: 1 / PixelRatio.get()
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
  initialRouteName: 'Mine',
  initialRouteParams: {
    type: 1,
    title: '无切换动画'
  },
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
})
