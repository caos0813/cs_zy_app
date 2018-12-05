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
  if (!url && _.isEmpty(gender)) {
    return Assets.icons.headIcon
  }
  if (url) {
    return {
      uri: url
    }
  } else {
    if (gender) {
      return require('../assets/mine/boy.png')
    } else {
      return require('../assets/mine/girl.png')
    }
  }
}

export { imageResize, imageFormat }
