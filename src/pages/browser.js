import React, { Component } from 'react'
import { WebView, StyleSheet, StatusBar } from 'react-native'
import { View, LoaderScreen } from '../../react-native-ui-lib/src'
import { colors } from './../theme'
import { Progress, Mask } from '../components'
import { width, BackPress } from '../utils'
import Picker from 'react-native-picker'
import SplashScreen from 'react-native-splash-screen'
import config from '../config'
export default class Browser extends Component {
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
  }
  goBack = () => {
    if (this.state.canGoBack) {
      this.refs.webview.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }
  onBackPress =() => {
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
  }
  onLoadEnd = () => {
    this.postMessage()
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
  postMessage = () => {
    this.refs.webview.postMessage(JSON.stringify({
      type: 'userInfo',
      data: {
        token: 1212
      }
    }))
  }
  onMessage = (e) => {
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
      }
    }
  }
  componentDidMount () {
    this.backPress.componentDidMount()
    SplashScreen.hide()
  }
  componentWillUnmount () {
    this.backPress.componentWillUnmount()
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
          color={colors.royal}
          message='正在加载...'
          messageStyle={{ color: colors.royal }}
          overlay
          {...animationConfig}
        />}
        {maskShow && <Mask />}
        <WebView ref='webview'
          style={styles.flex_1}
          source={{ uri: `${config.webUrl}${path}` }}
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
const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    zIndex: 1
  }
})
