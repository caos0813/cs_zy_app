import { AppRegistry, YellowBox, DeviceEventEmitter } from 'react-native'
import promise from 'es6-promise'
import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import Router from './src/router'
import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
import Config from 'react-native-config'
import codePush from 'react-native-code-push'
require('./src/utils/assets')
/* eslint-disable */
import theme from './src/theme'
import { statusBarHeight, storage, platform, navigator } from './src/utils'
import store from './src/store'
promise.polyfill()
class App extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider {...store}>
        <Router screenProps={{ statusBarHeight: statusBarHeight }} onNavigationStateChange={(prev, current, action) => {
          const { routes } = current
          console.log(routes)
          const { setRoutes } = store.routeStore
          setRoutes(routes)
        }} ref={navigatorRef => {
          navigator.setTopLevelNavigator(navigatorRef);
        }} />
      </Provider>
    )
  }
  update = () => {
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '检查到更新',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '确定'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    })
  }
  async componentDidMount () {
    this.update()
    /* 初始化极光 */
    if (platform === 'android') {
      JPushModule.initPush()

    } else {
      JPushModule.setupPush()
    }
    /* 初始化极光 */
    const { setUserInfo, getUserInfo } = store.userStore
    try {
      const userStorage = await storage.load({
        key: 'userInfo'
      })
      const { school, token } = userStorage
      if (token) {
        setUserInfo(userStorage)
        getUserInfo()
      }
      if (school && school.id) {
        let tag = Config.ENV === 'production' ? `pro_${data.province.id}` : `dev_${data.province.id}`
        try {
          JPushModule.setTags([tag], (e) => {
            //alert(JSON.stringify(e))
          })
        } catch (err) {

        }
      }
    } catch (err) {

    }
    DeviceEventEmitter.addListener('updateUserInfo', () => {
      const { userInfo } = store.userStore
      if (userInfo.token) {
        getUserInfo()
      }
    })
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
