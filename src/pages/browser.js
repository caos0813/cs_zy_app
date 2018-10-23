import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'
import { View, LoaderScreen, Button } from 'react-native-ui-lib'
import { colors } from './../theme'
import { Progress, Mask } from '../components'
import { width } from '../utils'
import Picker from 'react-native-picker'
import SplashScreen from 'react-native-splash-screen'

export default class Browser extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'webview'),
      headerLeft: () => {
        return <Button text-14 positive label='返回' size='small' outline onPress={() => {
          navigation.state.params.goBack(navigation.state.params.webviewCanBack)
        }} />
      }
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      maskShow: false
    }
  }
  goBack = (canBack) => {
    if (canBack) {
      this.refs.webview.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }
  onNavigationStateChange = (e) => {
    const { canGoBack } = e
    global.webviewCanBack = canGoBack
    this.props.navigation.setParams({// 给导航中增加监听事件
      webviewCanBack: canGoBack
    })
  }
  onLoadStart = () => {
    this.refs.progress.start()
  }
  onLoadEnd = () => {
    this.postMessage()
    this.refs.progress.end()
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
  componentDidMount () {
    SplashScreen.hide()
    this.props.navigation.setParams({// 给导航中增加监听事件
      goBack: this.goBack
    })
  }
  postMessage = () => {
    this.refs.webview.postMessage(JSON.stringify({
      type: 'auth',
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
      }
    }
  }
  render () {
    const { getParam } = this.props.navigation
    const { loading, animationConfig, maskShow } = this.state
    const type = getParam('type')
    return (
      <View flex>
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
        <Button label='postMessage' onPress={this.postMessage} />

        <WebView ref='webview'
          style={styles.flex_1}
          source={{ uri: type === 2 ? 'http://192.168.1.41:8082/#/school-list' : 'http://192.168.1.41:8082/#/index' }}
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
