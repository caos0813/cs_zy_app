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
import formatDate from './formatDate'
import navigator from './navigator'

const platform = Platform.OS
const ratio = PixelRatio.get()
const statusBarHeight = StatusBar.currentHeight
let { width, height } = Dimensions.get('screen')
export { width, height, getLayoutInfo, dialog, storage, platform, api, axios, BackPress, imageResize, ratio, statusBarHeight, Toast, OpenUrl, formatDate, navigator, imageFormat }
