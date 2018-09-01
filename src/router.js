import Login from './pages/login'
import { createStackNavigator } from 'react-navigation'
import { PixelRatio } from 'react-native'
import colors from './common/colors'
export default createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: '登录'
    })
  }
},
{
  navigationOptions: {
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
      color: colors.$dark04
    }
  },
  headerLayoutPreset: 'center',
  cardStyle: {
    height: 50,
    borderBottomColor: colors.$gray,
    borderBottomWidth: 1 / PixelRatio.get()
  }
})
