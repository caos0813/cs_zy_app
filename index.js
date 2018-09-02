import { AppRegistry, YellowBox } from 'react-native'
import Router from './src/router'
/* eslint-disable */
import theme from './src/theme'
AppRegistry.registerComponent('demoapp', () => Router)
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
