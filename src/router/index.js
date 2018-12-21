import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { dark04, light, calm, gray } from '../theme/colors'
import { platform, navigator, statusBarHeight } from '../utils'
import Login from '../pages/login'
import Home from '../pages/home'
import Browser from '../pages/browser'
import Mine from '../pages/mine'
import Info from '../pages/info'
import Feedback from '../pages/feedback'
import About from '../pages/about'
import Pay from '../pages/pay'
import Play from '../pages/play'
import PlanIndex from '../pages/PlanIndex'
import ByCollege from '../pages/byCollege'
import CommonList from '../pages/commonList'
import NewsDetail from '../pages/newsDetail'
import { BackAvatar } from '../components'
import { Image } from '../../react-native-ui-lib'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
const prefix = platform === 'android' ? 'zyzyapp://zyzyapp/' : 'zyzyapp://'

const TabStack = createBottomTabNavigator(
  {
    Index: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: '⾸⻚'
      })
    },
    Plan: {
      screen: PlanIndex,
      navigationOptions: () => ({
        tabBarLabel: '生涯规划'
      })
    },
    Mine: {
      screen: Mine,
      navigationOptions: () => ({
        tabBarLabel: '我的'
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Index') {
          iconName = 'home'
        } else if (routeName === 'Plan') {
          iconName = 'class'
        } else if (routeName === 'Mine') {
          iconName = 'mine'
        }
        return <Image assetName={iconName} tintColor={tintColor} />
      }
    }),
    tabBarOptions: {
      // 当前选中的tab bar的⽂本颜⾊和图标颜⾊
      activeTintColor: calm,
      // 当前未选中的tab bar的⽂本颜⾊和图标颜⾊
      inactiveTintColor: gray,
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
        height: 60,
        backgroundColor: light,
        paddingBottom: 0,
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: gray
      },
      // tab bar的⽂本样式
      labelStyle: {
        fontSize: 14,
        paddingTop: 5
      }
      // tab ⻚指示符的样式 (tab⻚下⾯的⼀条线).
      // indicatorStyle: { height: 0 }
    },
    // tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    // 是否允许滑动切换tab⻚
    swipeEnabled: true,
    // 是否在切换tab⻚时使⽤动画
    animationEnabled: true,
    // 是否懒加载
    lazy: true,
    // 返回按钮是否会导致tab切换到初始tab⻚？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none',
    initialRouteName: 'Index'
  }
)
const AppNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: '登录'
      })
    },
    Home: {
      screen: TabStack,
      navigationOptions: ({ navigation }) => ({
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
    ByCollege: {
      screen: ByCollege,
      navigationOptions: () => ({
        title: '查大学'
      })
    },
    CommonList: {
      screen: CommonList
    },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: () => ({
        header: null
      })
    },
    Play: {
      screen: Play
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
    initialRouteName: 'NewsDetail',
    initialRouteParams: {
      articleId: '311'
    },
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    })
  }
)
const app = () => <AppNavigation uriPrefix={prefix} screenProps={{ statusBarHeight: statusBarHeight }} ref={navigatorRef => {
  navigator.setTopLevelNavigator(navigatorRef)
}} />
export default app
