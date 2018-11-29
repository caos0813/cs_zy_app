import showWithOptions from '../../react-native-toast'
export default function (message, callBack) {
  showWithOptions({
    message: message || '未知错误',
    duration: 'short',
    position: 'bottom',
    addPixelsY: -40
  })
  if (callBack) {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      callBack()
    }, 2200)
  }
}
