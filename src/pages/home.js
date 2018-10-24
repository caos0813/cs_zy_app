import React, { Component } from 'react'
import { View, Button, Text } from 'react-native-ui-lib'
import JPushModule from 'jpush-react-native'
// import * as WeChat from 'react-native-wechat'
import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  SafeAreaView
} from 'react-native'
// import { RNCamera } from 'react-native-camera'
import codePush from 'react-native-code-push'
import { storage, dialog } from '../utils'
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: false,
      nativePickerValue: 'java'
    }
  }
  async componentDidMount () {
    const { navigate } = this.props.navigation
    storage.load({
      key: 'userInfo'
    }).then(data => {
      alert(data)
    }).catch(() => {
      dialog.confirm('您还没有登录，请先登录。').then(res => {
        navigate('Login')
      })
    })
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
    this.update()
    JPushModule.initPush()
  }
  setShow = () => {
    this.setState({
      camera: true
    })
  }
  update = () => {
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '检查到更新',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '确定'
      },
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
    })
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={styles.flex}>
        <View flex paddingH-10 paddingT-10>
          <View >
            <Text>
              演示首页，测试打开原生界面跟url的体验差别
            </Text>
          </View>
          <Button text-14 light label='原生界面切换' marginT-10 onPress={() => navigate('Login')} />
          <Button text-14 light label='无切换动画' marginT-10 onPress={() => navigate('Browser', {
            type: 1,
            title: '无切换动画'
          })} />
          <Button text-14 light label='css3切换动画' marginT-10 onPress={() => navigate('Test', {
            type: 2,
            title: 'css3切换动画'
          })} />
          {/* <TextInput text-15 placeholder='请输入手机号' dark10 keyboardType='phone-pad' />
          <TextInput text-15 placeholder='请输入密码' secureTextEntry dark10 />
          <View marginT-20 >
            <Button text-14 light bg-positive label='登录一下' onPress={() => {
              toast('显示了没')
            }} br20 />
          </View>
          <View right>
            <Button link text-14 positive label='忘记密码?' marginT-10 />
          </View> */}
          {/* {this.state.camera && <RNCamera
            ref={'camera'}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          />} */}
        </View>
      </SafeAreaView>
    )
  }

  takePicture = async () => {
    const options = { quality: 0.5, base64: true }
    const data = await this.refs.camera.takePictureAsync(options)
    alert(data.uri)
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
