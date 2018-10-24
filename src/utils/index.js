import { Dimensions, Platform } from 'react-native'
import getLayoutInfo from './layoutInfo'
import toast from './toast'
import dialog from './dialog'
import storage from './storage'
import api from './api'
import axios from './axios'
import BackPress from './backPress'

const platform = Platform.OS
let { width, height } = Dimensions.get('window')
export { width, height, getLayoutInfo, toast, dialog, storage, platform, api, axios, BackPress }
