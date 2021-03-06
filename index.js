import { AppRegistry, YellowBox, DeviceEventEmitter } from 'react-native'
import promise from 'es6-promise'
import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import Router from './src/router'
import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
import codePush from 'react-native-code-push'
import Config from 'react-native-config'
import JAnalyticsModule from 'janalytics-react-native'
require('./src/utils/assets')
/* eslint-disable */
import theme from './src/theme'
import {  storage, platform, navigator, statusBarHeight } from './src/utils'
import store from './src/store'
import SplashScreen from 'react-native-splash-screen'
const prefix = platform === 'android' ? 'zyzyapp://zyzyapp/' : 'zyzyapp://'
promise.polyfill()
class App extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider {...store}>
       <Router
          onNavigationStateChange={(from, to) => {
            const { routes } = to
            const { setRoutes } = store.routeStore
            setRoutes(routes)
          }}
          uriPrefix={prefix}
          screenProps={{ statusBarHeight: statusBarHeight }}
          ref={navigatorRef => {
            navigator.setTopLevelNavigator(navigatorRef)
          }} 
        />
      </Provider>
    )
  }
  update = () => {
    if (Config.ENV === 'production') {
      codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE  
      })
    } else {
      codePush.sync({
        updateDialog: {
          appendReleaseDescription: true,
          //descriptionPrefix: '检查到更新',
          title: '更新',
          mandatoryUpdateMessage: '',
          mandatoryContinueButtonLabel: '确定'
        },
        mandatoryInstallMode: codePush.InstallMode.ON_NEXT_SUSPEND,
        installMode: codePush.InstallMode.ON_NEXT_SUSPEND 
      })
    }
  }
  async componentDidMount () {
    this.update()
    /* 初始化极光 */
    JPushModule.initPush()
    JPushModule.clearAllNotifications()
    if(platform==='ios'){
      JAnalyticsModule.setup({appKey: "97ab5a6f89c340b6f61c74c4"})  // iOS 端需要先调用该方法
    }
    /* 初始化极光 */
    const { setUserInfo, getUserInfo } = store.userStore
    try {
      const userStorage = await storage.load({
        key: 'userInfo'
      })
      const { school, token, province } = userStorage
      if (token) {
        setUserInfo(userStorage)
        getUserInfo()
      }
      if (school && school.id) {
        let tag = (Config.ENV === 'production' ? `pro_${province.id}` : `dev_${province.id}`)
        try {
          JPushModule.setTags([tag], (e) => {
            //alert(JSON.stringify(e))
          })
        } catch (err) {
          //alert(JSON.stringify(err))
        }
      }
    } catch (err) {
      //alert(JSON.stringify(err))
    }
    DeviceEventEmitter.addListener('updateUserInfo', () => {
      const { userInfo } = store.userStore
      if (userInfo.token) {
        getUserInfo()
      }
    })
    if (Config.ENV === 'development') {
      SplashScreen.hide()
    }
  }
  componentWillMount () {
    console.log('componentWillUnmount')
  }
}
AppRegistry.registerComponent('app', () => App)
WeChat.registerApp('wx998c32e026b70535')
/* 判断运行环境 */
if (__DEV__) {
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
}
