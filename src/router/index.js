import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { dark04, light } from '../theme/colors'
import Login from '../pages/login'
import Home from '../pages/home'
import Browser from '../pages/browser'
import Mine from '../pages/mine'
import Info from '../pages/info'
import Feedback from '../pages/feedback'
import About from '../pages/about'
import Pay from '../pages/pay'
import PlanIndex from '../pages/PlanIndex'
import { BackAvatar } from '../components'
import { Image } from '../../react-native-ui-lib'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
const TabStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: '⾸⻚',
        title: '⽣涯规划'
      })
    },
    Plan: {
      screen: PlanIndex,
      navigationOptions: () => ({
        title: '⽣涯规划'
      })
    },
    Mine: {
      screen: Mine,
      navigationOptions: () => ({
        title: '我的'
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        // const { routeName } = navigation.state
        // let iconName
        // if (routeName === 'Home') {
        // iconName = `ios-information-circle${focused ? '' : '-outline'}`
        // } else if (routeName === 'Plan') {
        // iconName = `ios-options${focused ? '' : '-outline'}`
        // } else if (routeName === 'Mine') {
        // iconName = `ios-options${focused ? '' : '-outline'}`
        // }
        return <Image assetName='headIcon' tintColor={tintColor} />
      }
    }),
    tabBarOptions: {
      // 当前选中的tab bar的⽂本颜⾊和图标颜⾊
      activeTintColor: '#247197',
      // 当前未选中的tab bar的⽂本颜⾊和图标颜⾊
      inactiveTintColor: '#000',
      // 是否显示tab bar的图标，默认是false
      showIcon: true,
      // showLabel - 是否显示tab bar的⽂本，默认是true
      showLabel: true,
      // 是否将⽂本转换为⼤⼩，默认是true
      upperCaseLabel: false,
      // material design中的波纹颜⾊(仅⽀持Android >= 5.0)
      pressColor: '#788493',
      // 按下tab bar时的不透明度(仅⽀持iOS和Android < 5.0).
      pressOpacity: 0.8,
      // tab bar的样式
      style: {
        backgroundColor: '#ccc',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop: 1,
        borderTopColor: '#ccc'
      },
      // tab bar的⽂本样式
      labelStyle: {
        fontSize: 16,
        margin: 1
      },
      tabStyle: {
        height: 50
      },
      // tab ⻚指示符的样式 (tab⻚下⾯的⼀条线).
      indicatorStyle: { height: 0 }
    },
    // tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    // 是否允许滑动切换tab⻚
    swipeEnabled: false,
    // 是否在切换tab⻚时使⽤动画
    animationEnabled: false,
    // 是否懒加载
    lazy: true,
    // 返回按钮是否会导致tab切换到初始tab⻚？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',
    initialRouteName: 'Home'
  }
)
export default createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: '登录'
      })
    },
    Main: {
      screen: TabStack,
      navigationOptions: () => ({
        header: null
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
        title: '我的志愿卡'
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
      // gesturesEnabled: true,
      headerLeft: <BackAvatar onPress={navigation.goBack} />,
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
    initialRouteName: 'Main',
    /* initialRouteParams: {
    type: 'complete'
    }, */
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
  }
)
