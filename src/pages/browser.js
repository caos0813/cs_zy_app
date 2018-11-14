import React, { Component } from 'react'
import { WebView, StyleSheet, StatusBar, DeviceEventEmitter } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { View, LoaderScreen } from '../../react-native-ui-lib'
import { colors } from './../theme'
import { Progress, Mask } from '../components'
import { width, BackPress, statusBarHeight, OpenUrl } from '../utils'
import Picker from 'react-native-picker'
import SplashScreen from 'react-native-splash-screen'
import Config from 'react-native-config'
import _ from 'lodash'
@inject('userStore')
@observer class Browser extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
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
      loading: false,
      maskShow: false,
      canGoBack: false
    }
    this.backPress = new BackPress({ backPress: this.onBackPress })
    this.OpenUrl = new OpenUrl(props)
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  goBack = () => {
    if (this.state.canGoBack) {
      this.refs.webview.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }
  onBackPress = () => {
    if (this.state.canGoBack) {
      this.refs.webview.goBack()
      return true
    } else {
      return false
    }
  }
  onNavigationStateChange = (e) => {
    const { canGoBack } = e
    console.log(canGoBack)
    console.log('onNavigationStateChange')
    this.setState({
      canGoBack: canGoBack
    })
    /* global.webviewCanBack = canGoBack
    this.props.navigation.setParams({// 给导航中增加监听事件
      webviewCanBack: canGoBack
    }) */
  }
  onLoadStart = () => {
    this.refs.progress.start()
    this.setState({ loading: true })
  }
  onLoadEnd = () => {
    this.initMessage()
    this.refs.progress.end()
    //  this.refs.webview.injectJavaScript(`document.body.style.paddingTop="${statusBarHeight}px"`)
    setTimeout(() => {
      try {
        this.setState({
          animationConfig: {
            animation: 'fadeOut',
            onAnimationEnd: () => this.setState({ loading: false })
          }
        })
      } catch (err) {

      }
    }, 800)
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
    const { navigate } = this.props.navigation
    let data
    try {
      data = JSON.parse(e.nativeEvent.data)
    } catch (err) {

    }
    if (data) {
      switch (data.type) {
        case 'picker':
          this.setState({
            maskShow: true
          })
          Picker.init({
            ...data.data,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {
              this.setState({
                maskShow: false
              })
              this.refs.webview.postMessage(JSON.stringify({
                type: 'picker',
                data: {
                  type: 'confirm',
                  value: data
                }
              }))
            },
            onPickerCancel: data => {
              this.setState({
                maskShow: false
              })
              this.refs.webview.postMessage(JSON.stringify({
                type: 'picker',
                data: {
                  type: 'cancel',
                  value: data
                }
              }))
            },
            onPickerSelect: data => {
              this.setState({
                maskShow: false
              })
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
          this.goBack()
          break
        case 'updateUserInfo':
          // alert(JSON.stringify(data))
          let newUserInfo = _.clone(userInfo)
          newUserInfo[data.data.name] = data.data.value
          setUserInfo(newUserInfo)
          break
        case 'routeChange':
          // const { path, query, auth } = data.data
          // this.openUrl(path, query, auth)
          break
        case 'navigate':
          const { path, query } = data.data
          navigate(path, query)
          break
      }
    }
  }
  componentDidMount () {
    this.backPress.componentDidMount()
    SplashScreen.hide()
  }
  componentWillUnmount () {
    this.backPress.componentWillUnmount()
    DeviceEventEmitter.emit('updateUserInfo')
  }
  render () {
    const { getParam } = this.props.navigation
    const { loading, animationConfig, maskShow } = this.state
    const path = getParam('path')
    return (
      <View flex useSafeArea>
        <StatusBar translucent={false} barStyle='dark-content' />
        <Progress
          ref='progress'
          style={styles.progress}
          width={width}
        />
        {loading && <LoaderScreen
          color={colors.positive}
          message='正在加载'
          messageStyle={{ color: colors.positive }}
          overlay
          {...animationConfig}
        />}
        {maskShow && <Mask />}
        <WebView ref='webview'
          style={{ backgroundColor: colors.stable }}
          source={{ uri: `${Config.WEB_URL}${path}` }}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          onNavigationStateChange={this.onNavigationStateChange}
          onMessage={(e) => {
            this.onMessage(e)
          }}
        />
      </View>
    )
  }
}
export default Browser
const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    zIndex: 1
  }
})
