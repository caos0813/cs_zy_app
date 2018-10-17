import { AppRegistry, YellowBox } from 'react-native'
import Router from './src/router'
/* eslint-disable */
import theme from './src/theme'
AppRegistry.registerComponent('app', () => Router)
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
