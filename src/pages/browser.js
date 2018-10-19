import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'
import { View, LoaderScreen, Button } from 'react-native-ui-lib'
import { colors } from './../theme'
import { Progress } from '../components'
import Picker from 'react-native-picker'
import { width } from '../utils'
import SplashScreen from 'react-native-splash-screen'

let data = []
for (var i = 0; i < 100; i++) {
  data.push(i)
}

Picker.init({
  pickerData: data,
  selectedValue: [59],
  onPickerConfirm: data => {
    console.log(data)
  },
  onPickerCancel: data => {
    console.log(data)
  },
  onPickerSelect: data => {
    console.log(data)
  }
})
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
      loading: true
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
  onLoad = () => {
    this.refs.progress.start()
  }
  onLoadEnd = () => {
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
  postMessage=() => {
    this.refs.webview.postMessage('发送一个消息')
  }
  render () {
    const { getParam } = this.props.navigation
    const { loading, animationConfig } = this.state
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
        <Button label='postMessage' onPress={this.postMessage} />
        <WebView ref='webview'
          style={styles.flex_1}
          source={{ uri: type === 2 ? 'http://ustbhuangyi.com/music/#/recommend' : 'http://192.168.1.41:8080' }}
          onLoad={this.onLoad}
          onLoadEnd={this.onLoadEnd}
          onNavigationStateChange={this.onNavigationStateChange}
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
