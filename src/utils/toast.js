import showWithOptions from '../../react-native-toast'
export default function (message, callBack) {
  showWithOptions({
    message,
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
