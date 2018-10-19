import { AppRegistry, YellowBox } from 'react-native'
import Router from './src/router'
import * as WeChat from 'react-native-wechat'
/* eslint-disable */
import theme from './src/theme'
AppRegistry.registerComponent('app', () => Router)
WeChat.registerApp('wx998c32e026b70535')
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
