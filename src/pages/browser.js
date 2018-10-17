import React, { Component } from 'react'
import { WebView, StyleSheet, Clipboard } from 'react-native'
import { View, LoaderScreen, Button } from 'react-native-ui-lib'
import { colors } from './../theme'
import Picker from 'react-native-picker'
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
  constructor (props) {
    super(props)
    this.state = {
      content: 'Content will appear here',
      loading: false
    }
  }
  onMessage = (e) => {
    Picker.show()
  }
  sendMessage = () => {
    this.refs.webview.postMessage({
      type: 1,
      text: '这是app发送到html的消息'
    })
  }
  _setClipboardContent = async () => {
    Clipboard.setString('Hello World')
    try {
      const content = await Clipboard.getString()
      this.setState({ content })
    } catch (e) {
      this.setState({ content: e.message })
    }
  }
  onLoadEnd = () => {
    setTimeout(() => {
      this.setState({
        animationConfig: {
          animation: 'fadeOut',
          onAnimationEnd: () => this.setState({ loading: false })
        }
      })
    }, 800)
  }
  onNavigationStateChange = (e) => {
    this.setState({
      loading: true
    })
  }
  render () {
    const { loading, animationConfig } = this.state
    return (
      <View flex>
        {loading &&
          <LoaderScreen
            color={colors.positive}
            message='正在加载...'
            overlay
            // backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
            {...animationConfig}
          />}
        <WebView ref={'webview'} style={styles.flex_1} onMessage={(e) => {
          this.onMessage(e)
        }} source={{ uri: 'http://ustbhuangyi.com/music/#/recommend' }} onLoadEnd={this.onLoadEnd} onNavigationStateChange={this.onNavigationStateChange}
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
