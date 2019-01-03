import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import getLayoutInfo from './layoutInfo'
import dialog from './dialog'
import storage from './storage'
import api from './api'
import axios from './axios'
import BackPress from './backPress'
import { imageResize, imageFormat } from './imageResize'
import Toast from './toast'
import OpenUrl from './openUrl'
import { formatDate, transferTime, transferPlayerTime, formatVersion } from './formatDate'
import navigator from './navigator'
import getUrlParams from './urlParams'
import { Constants } from '../../react-native-ui-lib/src/helpers'

const platform = Platform.OS
const ratio = PixelRatio.get()
let statusBarHeight = StatusBar.currentHeight
if (platform === 'ios' && !Constants.isIphoneX) {
  statusBarHeight = 20
} else if (Constants.isIphoneX) {
  statusBarHeight = 44
}
let { width, height } = Dimensions.get('screen')
export { width, height, getLayoutInfo, dialog, storage, platform, api, axios, BackPress, imageResize, ratio, statusBarHeight, Toast, OpenUrl, formatDate, navigator, imageFormat, transferTime, transferPlayerTime, getUrlParams, formatVersion }
