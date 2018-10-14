import {
  findNodeHandle,
  UIManager
} from 'react-native'
const getLayoutInfo = function (ref) {
  const handle = findNodeHandle(ref)
  return new Promise((resolve) => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      resolve({
        x,
        y,
        width,
        height,
        pageX,
        pageY
      })
    })
  })
}
export default getLayoutInfo
