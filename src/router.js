import { createStackNavigator } from 'react-navigation'
import { PixelRatio } from 'react-native'
import { dark04, gray, light } from './theme/colors'
import Login from './pages/login'
import Home from './pages/home'
import Browser from './pages/browser'
import Test from './pages/test'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
export default createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: '登录'
    })
  },
  Test: {
    screen: Test,
    navigationOptions: () => ({
      title: 'Test'
    })
  },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: '首页'
    })
  },
  Browser: {
    screen: Browser
  }
},
{
  navigationOptions: {
    headerStyle: {
      height: 50,
      borderBottomColor: gray,
      elevation: 0,
      borderBottomWidth: 1 / PixelRatio.get()
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
      color: dark04
    }
  },
  headerLayoutPreset: 'center',
  cardStyle: {
    backgroundColor: light
  },
  initialRouteName: 'Login',
  initialRouteParams: {
    type: 1,
    title: '无切换动画'
  },
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
})
