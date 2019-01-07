import _ from 'lodash'
export default class OpenUrl {
  constructor (props) {
    this.props = props
  }
  openBrowser (path, query, needAuth) {
    const { navigation } = this.props
    let queryString = path
    if (!_.isEmpty(query)) {
      queryString += '?'
      _.forIn(query, function (value, key) {
        queryString += `${key}=${value}&`
      })
      queryString = queryString.slice(0, -1)
    }
    navigation.navigate('Browser', {
      path: queryString,
      needAuth
    })
    // if (!needAuth) {
    //   navigation.navigate('Browser', {
    //     path: queryString
    //   })
    // } else {
    //   if (userInfo.token && userInfo.startYear) {
    //     navigation.navigate('Browser', {
    //       path: queryString
    //     })
    //   } else if (userInfo.token && !userInfo.startYear) {
    //     navigation.navigate('Info', { type: 'complete' })
    //   } else {
    //     navigation.navigate('Login')
    //   }
    // }
  }
  openNative (path, query, needAuth) {
    // alert(needAuth)
    const { navigation } = this.props
    let params = query || {}
    navigation.navigate(path, { ...params, needAuth })
    /* if (!needAuth) {
      navigation.navigate(path, query)
    } else {
      if (userInfo.token && userInfo.startYear) {
        navigation.navigate(path, query)
      } else if (userInfo.token && !userInfo.startYear) {
        navigation.navigate('Info', { type: 'complete' })
      } else {
        navigation.navigate('Login')
      }
    } */
  }
}
