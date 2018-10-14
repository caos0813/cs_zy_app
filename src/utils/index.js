import { Dimensions } from 'react-native'
import getLayoutInfo from './layoutInfo'
let { width, height } = Dimensions.get('window')
export { width, height, getLayoutInfo }
