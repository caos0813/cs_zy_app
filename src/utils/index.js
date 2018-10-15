import { Dimensions } from 'react-native'
import getLayoutInfo from './layoutInfo'
import toast from './toast'
let { width, height } = Dimensions.get('window')
export { width, height, getLayoutInfo, toast }
