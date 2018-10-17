import { createStackNavigator } from 'react-navigation'
import { PixelRatio } from 'react-native'
import { dark04, gray, light } from './theme/colors'
import Login from './pages/login'
import Home from './pages/home'
import Browser from './pages/browser'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
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
      title: '首页'
    })
  },
  Browser: {
    screen: Browser,
    navigationOptions: () => ({
      title: '测试1'
    })
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
  initialRouteName: 'Home',
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  })
})
