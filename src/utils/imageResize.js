import _ from 'lodash'
import { Assets } from '../../react-native-ui-lib'
function imageResize (url, w, h) {
  if (url) {
    return `${url}?x-oss-process=image/resize,w_${w}` + (h ? `,h_${h}` : '')
  } else {
    return 'https://fdwebhost.oss-cn-huhehaote.aliyuncs.com/zyzy_app/images/placeholder1.png'
  }
}
function imageFormat (url, gender) {
  if (url) {
    return {
      uri: url
    }
  } else if (!url && _.isBoolean(gender)) {
    if (gender) {
      return require('../assets/mine/boy.png')
    } else {
      return require('../assets/mine/girl.png')
    }
  } else {
    return Assets.icons.headIcon
  }
}

export { imageResize, imageFormat }
