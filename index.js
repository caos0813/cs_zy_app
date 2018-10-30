import { AppRegistry, YellowBox } from 'react-native'
import promise from 'es6-promise'
import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import Router from './src/router'
import * as WeChat from 'react-native-wechat'
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
/* eslint-disable */
import theme from './src/theme'
import { statusBarHeight, storage } from './src/utils'
import store from './src/store'
promise.polyfill()
class App extends Component {
  render () {
    return (
      <Provider {...store}>
        <Router screenProps={{ statusBarHeight: statusBarHeight }} />
      </Provider>
    )
  }
  componentDidMount () {
    const { setUserInfo, getUserInfo, userInfo } = store.userStore
    storage.load({
      key: 'userInfo'
    }).then(data => {
      //alert(JSON.stringify(data))
      if (data && !_.isEmpty(data)) {
        setUserInfo(data)
        getUserInfo()
      }
    }).catch(() => {
      //  setUserInfo({})
    })
    setTimeout (() => {
      SplashScreen.hide()
    }, 2000);
  }
}
AppRegistry.registerComponent('app', () => App)
WeChat.registerApp('wx998c32e026b70535')
/* 判断运行环境 */
if (__DEV__) {
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
}
