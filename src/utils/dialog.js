import { Alert } from 'react-native'
export default {
  alert (content) {
    return new Promise((resolve, reject) => {
      Alert.alert(
        '提示',
        content,
        [
          { text: '确定', onPress: () => resolve(true) }
        ],
        { cancelable: false }
      )
    })
  },
  confirm (content) {
    return new Promise((resolve, reject) => {
      Alert.alert(
        '提示',
        content,
        [
          { text: '取消', onPress: () => reject(new Error(false)), style: 'cancel' },
          { text: '确定', onPress: () => resolve(true) }
        ],
        { cancelable: false }
      )
    })
  }
}
