import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, NavigationActions } from 'react-navigation'
import { dark, light, calm, gray } from '../theme/colors'
import { ratio, width, platform } from '../utils'
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
import Seek from '../pages/seek'
import VolunteerAnswer from '../pages/volunteerAnswer'
import ByProfession from '../pages/byProfession'
import ProfessionTag from '../pages/professionTag'
import CommentList from '../pages/comment/comment'
import Praise from '../pages/comment/praise'
import Test from '../pages/test'
import ByMajor from '../pages/byMajor'
import { BackAvatar } from '../components'
import { Image } from '../../react-native-ui-lib'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import { colors } from '../theme'
import userStore from '../store/userStore'
const TabStack = createBottomTabNavigator(
  {
    Home: {
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName, iconColor
        if (routeName === 'Home') {
          iconName = 'home'
        } else if (routeName === 'Plan') {
          iconName = 'class'
        } else if (routeName === 'Mine') {
          iconName = 'mine'
        }
        if (!focused) {
          iconColor = colors.dark
        } else {
          iconColor = colors.calm
        }
        return <Image assetName={iconName} tintColor={iconColor} />
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
        height: 50,
        backgroundColor: light,
        paddingBottom: 0,
        paddingTop: 5,
        borderTopWidth: 1 / ratio,
        borderTopColor: gray
      },
      // tab bar的⽂本样式
      labelStyle: {
        fontSize: 10,
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
    initialRouteName: 'Home'
  }
)
const CommentTab = createMaterialTopTabNavigator({
  Comment: {
    screen: CommentList,
    navigationOptions: () => ({
      tabBarLabel: '评论'
    })
  },
  Praise: {
    screen: Praise,
    navigationOptions: () => ({
      tabBarLabel: '点赞'
    })
  }
}, {
  tabBarOptions: {
    style: {
      elevation: 0,
      borderColor: colors.gray,
      backgroundColor: colors.light,
      borderBottomWidth: 1 / ratio
    },
    indicatorStyle: {
      borderColor: colors.dark04,
      width: 110,
      left: (width / 2 - 110) / 2,
      borderBottomWidth: 2,
      zIndex: 10
    },
    labelStyle: {
      fontSize: 16,
      color: colors.dark06
    }
  },
  lazy: true,
  initialRouteName: 'Comment'
})

const AppNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: '登录'
      })
    },
    Comment: {
      screen: CommentTab,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BackAvatar assetName='backClose' onPress={navigation.goBack} />,
        headerStyle: {
          height: 44,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: 'hidden',
          borderBottomColor: gray,
          elevation: 0,
          borderBottomWidth: 0
        },
        title: '互动',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'normal',
          color: dark
        },
        cardStyle: {
          backgroundColor: colors.dark
        }
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
    ByProfession: {
      screen: ByProfession,
      navigationOptions: () => ({
        title: '查职业'
      })
    },
    ProfessionTag: {
      screen: ProfessionTag,
      navigationOptions: () => ({
        title: '全部兴趣标签'
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
    Seek: {
      screen: Seek,
      navigationOptions: () => ({
        title: '高考咨询'
      })
    },
    Play: {
      screen: Play
    },
    Test: {
      screen: Test
    },
    VolunteerAnswer: {
      screen: VolunteerAnswer,
      navigationOptions: () => ({
        title: '志愿问答'
      })
    },
    Browser: {
      screen: Browser,
      navigationOptions: () => ({
        header: null
      })
    },
    ByMajor: {
      screen: ByMajor,
      navigationOptions: () => ({
        title: '查专业'
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      // gesturesEnabled: true,
      headerLeft: <BackAvatar onPress={navigation.goBack} />,
      /* headerBackImage: <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}><Image
        source={require('../assets/icons/ic_back.png')}
        tintColor={colors.dark}
      /></View>, */
      headerPressColorAndroid: 'transparent',
      headerStyle: {
        height: 44 + (platform === 'android' ? screenProps.statusBarHeight : 0),
        paddingTop: platform === 'android' ? screenProps.statusBarHeight : 0,
        // borderBottomColor: gray,
        elevation: 0,
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: dark
      }
    }),
    headerLayoutPreset: 'center',
    cardStyle: {
      backgroundColor: colors.light
    },
    initialRouteName: 'Home',
    initialRouteParams: {
      articleId: '607'
    },
    transitionConfig: (transitionProps, prevTransitionProps) => {
      const currentPage = transitionProps.scene
      const prePage = prevTransitionProps && prevTransitionProps.scene
      let amimate = StackViewStyleInterpolator.forHorizontal
      const arr = ['Comment', 'Play']
      if (currentPage && prePage) {
        if (arr.indexOf(currentPage.route.routeName) > -1 || arr.indexOf(prePage.route.routeName) > -1) {
          amimate = StackViewStyleInterpolator.forVertical
        }
      }
      return {
        transitionSpec: {
          duration: 200,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing
        },
        screenInterpolator: amimate
      }
    }
  }
)
// 拦截登录的路由
const unNeedLoginRoute = ['Home', 'Plan', 'Mine', 'About', 'NewsDetail']

const defaultGetStateForAction = AppNavigation.router.getStateForAction

AppNavigation.router.getStateForAction = (action, state) => {
  const { routeName, type } = action
  const { token, startYear } = userStore.userInfo
  const params = state ? state.routes[state.routes.length - 1].params : null
  if (state &&
    type === NavigationActions.NAVIGATE && params &&
    routeName === params.name) {
    return null
  } else if (routeName && unNeedLoginRoute.indexOf(routeName) < 0 && state) {
    let interceptName = 'Login'
    let routes = []
    if (!token) {
      routes = [
        ...state.routes,
        { key: 'id-' + Date.now(), routeName: interceptName, params: { name: routeName, params: action.params } }
      ]
      return {
        ...state,
        routes,
        index: routes.length - 1
      }
    } else if (token && !startYear) {
      interceptName = 'Info'
      routes = [
        ...state.routes,
        { key: 'id-' + Date.now(), routeName: interceptName, params: { name: routeName, params: action.params, type: 'complete' } }
      ]
      return {
        ...state,
        routes,
        index: routes.length - 1
      }
    } else {
      return defaultGetStateForAction(action, state)
    }
  }
  return defaultGetStateForAction(action, state)
}
export default createAppContainer(AppNavigation)
