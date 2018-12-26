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
import { formatDate, transferTime, transferPlayerTime } from './formatDate'
import navigator from './navigator'
import getUrlParams from './urlParams'

const platform = Platform.OS
const ratio = PixelRatio.get()
const statusBarHeight = StatusBar.currentHeight || 0
let { width, height } = Dimensions.get('screen')
export { width, height, getLayoutInfo, dialog, storage, platform, api, axios, BackPress, imageResize, ratio, statusBarHeight, Toast, OpenUrl, formatDate, navigator, imageFormat, transferTime, transferPlayerTime, getUrlParams }
