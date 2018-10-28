import Toast from '@remobile/react-native-toast'
export default function (txt) {
  Toast.showShortBottom(txt)
  // return new Promise((resolve, reject) => {
  //   Toast.show(txt, {
  //     duration: Toast.durations.SHORT,
  //     position: Toast.positions.BOTTOM,
  //     shadow: true,
  //     animation: true,
  //     hideOnPress: true,
  //     delay: 0,
  //     onHidden: function () {
  //       resolve(true)
  //     }
  //   })
  // })
}
