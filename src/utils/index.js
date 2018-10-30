import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import getLayoutInfo from './layoutInfo'
import dialog from './dialog'
import storage from './storage'
import api from './api'
import axios from './axios'
import BackPress from './backPress'
import imageResize from './imageResize'
import Toast from './toast'
import OpenUrl from './openUrl'

const platform = Platform.OS
const ratio = PixelRatio.get()
const statusBarHeight = StatusBar.currentHeight
let { width, height } = Dimensions.get('window')
export { width, height, getLayoutInfo, dialog, storage, platform, api, axios, BackPress, imageResize, ratio, statusBarHeight, Toast, OpenUrl }
