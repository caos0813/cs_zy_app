import { AppRegistry, YellowBox } from 'react-native'
import Router from './src/router'
AppRegistry.registerComponent('demoapp', () => Router)
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])// 忽略警告
