import React, { Component } from 'react'
import { View, Button, Text, TextInput } from 'react-native-ui-lib'
import { Progress } from '../components'
import { width, toast } from '../utils'
import {
  StyleSheet,
  SafeAreaView
} from 'react-native'
// import { RNCamera } from 'react-native-camera'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: false
    }
  }
  componentDidMount () {
    this.update()
    this.refs.progress.start()
    setTimeout(() => {
      SplashScreen.hide()
      this.refs.progress.end()
    }, 2000)
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
        <Progress
          ref='progress'
          style={{ width: width }}
        />
        <View flex paddingH-10 paddingT-10>
          <View >
            <Text>
              演示首页，测试打开原生界面跟url的体验差别
            </Text>
          </View>
          <Button text-14 light label='原生界面' marginT-10 onPress={() => navigate('Login')} />
          <Button text-14 light label='打开url' marginT-10 onPress={() => navigate('Browser')} />
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
