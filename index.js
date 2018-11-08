import { AppRegistry, YellowBox } from 'react-native'
import promise from 'es6-promise'
import React, { Component } from 'react'
import { Provider } from 'mobx-react/native'
import Router from './src/router'
import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
import _ from 'lodash'
import SplashScreen from 'react-native-splash-screen'
import Config from 'react-native-config'
//  import codePush from 'react-native-code-push'

/* eslint-disable */
import theme from './src/theme'
import { statusBarHeight, storage, platform } from './src/utils'
import store from './src/store'
promise.polyfill()
class App extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider {...store}>
        <Router screenProps={{ statusBarHeight: statusBarHeight }} />
      </Provider>
    )
  }
  update = () => {
    codePush.sync({
      /* updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '检查到更新',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '确定'
      }, */
      mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART
    })
  }
  componentDidMount () {
    // this.update()
    /* 初始化极光 */
    if (platform === 'android') {
      JPushModule.initPush()
      
    } else {
      JPushModule.setupPush()
    }
    /* 初始化极光 */
    const { setUserInfo, getUserInfo, userInfo } = store.userStore
    storage.load({
      key: 'userInfo'
    }).then(data => {
      if (data.dataFlag) {
        try {
          let tag = Config.ENV==='production' ? `pro_${data.province.id}` : `dev_${data.province.id}`
          JPushModule.setTags([tag], (e) => {
            //alert(JSON.stringify(e))
          })
          //JPushModule.setAlias(data.userId)
        } catch (err) {

        }
      }
      if (data && !_.isEmpty(data)) {
        setUserInfo(data)
        getUserInfo()
      }
    }).catch(() => {
      //  setUserInfo({})
    })
    setTimeout(() => {
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
