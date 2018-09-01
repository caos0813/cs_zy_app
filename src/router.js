import Login from './pages/login'
import { createStackNavigator } from 'react-navigation'
import { PixelRatio } from 'react-native'
import { $dark04, $gray } from './common/colors'
console.log($dark04)
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
      color: $dark04
    }
  },
  headerLayoutPreset: 'center',
  cardStyle: {
    height: 50,
    borderBottomColor: $gray,
    borderBottomWidth: 1 / PixelRatio.get()
  }
})
