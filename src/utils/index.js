import { Dimensions, Platform, PixelRatio } from 'react-native'
import getLayoutInfo from './layoutInfo'
import toast from './toast'
import dialog from './dialog'
import storage from './storage'
import api from './api'
import axios from './axios'
import BackPress from './backPress'
import imageResize from './imageResize'

const platform = Platform.OS
const ratio = PixelRatio.get()
let { width, height } = Dimensions.get('window')
export { width, height, getLayoutInfo, toast, dialog, storage, platform, api, axios, BackPress, imageResize, ratio }
