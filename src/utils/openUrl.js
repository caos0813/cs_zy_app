import _ from 'lodash'
export default class OpenUrl {
  constructor (props) {
    this.props = props
  }
  openBrowser (path, query, needAuth) {
    const { navigation, userStore } = this.props
    const { userInfo } = userStore
    let queryString = path
    if (!_.isEmpty(query)) {
      queryString += '?'
      _.forIn(query, function (value, key) {
        queryString += `${key}=${value}&`
      })
      queryString = queryString.slice(0, -1)
    }
    if (!needAuth) {
      navigation.navigate('Browser', {
        path: queryString
      })
    } else {
      if (userInfo.token && userInfo.dataFlag) {
        navigation.navigate('Browser', {
          path: queryString
        })
      } else if (userInfo.token && !userInfo.dataFlag) {
        navigation.navigate('Info', { type: 'complete' })
      } else {
        navigation.navigate('Login')
      }
    }
  }
  openNative (path, query, needAuth) {
    const { navigation, userStore } = this.props
    const { userInfo } = userStore
    if (!needAuth) {
      navigation.navigate(path, query)
    } else {
      if (userInfo.token && userInfo.dataFlag) {
        navigation.navigate(path, query)
      } else if (userInfo.token && !userInfo.dataFlag) {
        navigation.navigate('Info')
      } else {
        navigation.navigate('Login')
      }
    }
  }
}
