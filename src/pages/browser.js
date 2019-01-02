import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer, inject } from 'mobx-react/native'
import { View, LoaderScreen } from '../../react-native-ui-lib'
import { colors } from './../theme'
<<<<<<< HEAD
import { NoNetwork } from '../components'
import { BackPress, statusBarHeight, OpenUrl } from '../utils'
=======
import { Progress, Mask, NoNetwork } from '../components'
import { width, BackPress, statusBarHeight, OpenUrl, navigator } from '../utils'
>>>>>>> 5aac79a4fa76738a87d6f8e9b607fe201c475a1d
import Picker from 'react-native-picker'
import Config from '../config'
import _ from 'lodash'
@inject('userStore')
@observer class Browser extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      gesturesEnabled: false
      /* title: navigation.getParam('title', 'webview'),
      headerLeft: () => {
        return <Button text-14 positive label='返回' size='small' outline onPress={() => {
          navigation.state.params.goBack(navigation.state.params.webviewCanBack)
        }} />
      } */
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      firstLoad: true,
      canGoBack: false,
      route: {}// webview route
    }
    this.backPress = new BackPress({ backPress: this.onBackPress })
    this.OpenUrl = new OpenUrl(props)
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  goBack = (enforcement) => {
    const { route } = this.state
    if (route.path === 'holland' && !enforcement) {
      this.refs.webview.postMessage(JSON.stringify({
        type: 'preventBack',
        data: {}
      }))
      return
    }
    // if (route.path === 'volunteer-fill-index') {
    //   // return
    // }
    if (this.state.canGoBack) {
      console.log(2222)
      this.refs.webview.goBack()
      // this.refs.webview.reload()
    } else {
      this.props.navigation.goBack()
    }
  }
  onBackPress = () => {
    const { route } = this.state
    if (route.path === 'holland') {
      this.refs.webview.postMessage(JSON.stringify({
        type: 'preventBack',
        data: {}
      }))
      return true
    }
    if (route.path === 'volunteer-fill-index') {
      this.refs.webview.postMessage(JSON.stringify({
        type: 'fillBack',
        data: {}
      }))
      // return true
    }
    if (this.state.canGoBack) {
      console.log(333)
      this.refs.webview.goBack()
      return true
    } else {
      return false
    }
  }
  onNavigationStateChange = (e) => {
    const { canGoBack } = e
    console.log(e)
    this.setState({
      canGoBack: canGoBack
    })
    this.props.navigation.setParams({// 给导航中增加监听事件
      webviewCanBack: canGoBack
    })
  }
  onLoadStart = () => {
    // Loading.show()
  }
  onLoadEnd = () => {
    this.initMessage()
    // Loading.hide()
    this.setState({
      firstLoad: false
    })
  }
  /* 打开浏览器时发送到webview的数据 */
  initMessage = () => {
    const { userInfo } = this.props.userStore
    this.refs.webview.postMessage(JSON.stringify({
      type: 'initData',
      data: {
        statusBarHeight: statusBarHeight,
        ...userInfo
      }
    }))
  }
  onMessage = (e) => {
    const { userInfo, setUserInfo } = this.props.userStore
    const { navigate, replace } = this.props.navigation
    let data
    try {
      data = JSON.parse(e.nativeEvent.data)
      // console.log(data)
    } catch (err) {

    }
    if (data) {
      switch (data.type) {
        case 'picker':

          Picker.init({
            ...data.data,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {
              this.refs.webview.postMessage(JSON.stringify({
                type: 'picker',
                data: {
                  type: 'confirm',
                  value: data
                }
              }))
            },
            onPickerCancel: data => {
              this.refs.webview.postMessage(JSON.stringify({
                type: 'picker',
                data: {
                  type: 'cancel',
                  value: data
                }
              }))
            },
            onPickerSelect: data => {
              this.refs.webview.postMessage(JSON.stringify({
                type: 'picker',
                data: {
                  type: 'select',
                  value: data
                }
              }))
            }
          })
          Picker.show()
          break
        case 'goBack':
          this.goBack(true)
          break
        case 'updateUserInfo':
          // alert(JSON.stringify(data))
          let newUserInfo = _.clone(userInfo)
          newUserInfo[data.data.name] = data.data.value
          setUserInfo(newUserInfo)
          break
        case 'routeChange':
          const { path, query, auth } = data.data
          this.setState({
            route: {
              path, query, auth
            }
          })
          // this.openUrl(path, query, auth)
          break
        case 'navigate':
          const routes = data.data
          console.log(routes.query)
          navigate(routes.path, routes.query)
          break
        case 'replace':
          /*  {type:'replace',data:{path:'Login'}} */
          const routeData = data.data
          replace(routeData.path, routeData.query)
          break
      }
    }
  }
  componentDidMount () {
    this.backPress.componentDidMount()
  }
  componentWillUnmount () {
    this.backPress.componentWillUnmount()
    DeviceEventEmitter.emit('updateUserInfo')
  }
  refresh = () => {
    const { state, replace } = this.props.navigation
    replace(state)
  }
  render () {
    const { getParam } = this.props.navigation
    const path = getParam('path')
    return (
      <View flex >
        <NoNetwork refresh={this.refresh} />
        <WebView ref='webview'
          bounces={false}
          style={{ backgroundColor: colors.stable }}
          source={{ uri: `${Config.WEB_URL}${path}` }}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onNavigationStateChange={this.onNavigationStateChange}
          useWebKit={false}
          renderLoading={() => <LoaderScreen message='正在加载' messageStyle={{ color: colors.dark09 }}
            overlay />}
          startInLoadingState
          onMessage={(e) => {
            this.onMessage(e)
          }}
        />
      </View>
    )
  }
}
export default Browser
