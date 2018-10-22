import _ from 'lodash'
import React, { Component } from 'react'
import { View, Button, Text, Picker } from 'react-native-ui-lib'
// import * as WeChat from 'react-native-wechat'
import {
  StyleSheet,
  SafeAreaView
} from 'react-native'
// import { RNCamera } from 'react-native-camera'
const options = [
  { label: 'JavaScript', value: 'js' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'c++' },
  { label: 'Perl', value: 'perl' }
]
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: false,
      nativePickerValue: 'js'
    }
  }
  async componentDidMount () {
    this.update()
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
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
        <Picker
          title='Native Picker'
          placeholder='Pick a Language'
          value={this.state.nativePickerValue}
          onChange={nativePickerValue => this.setState({ nativePickerValue })}
          // renderNativePicker={(props) => {
          //   return (
          //     <View flex bg-red50>
          //       <Text>CUSTOM NATIVE PICKER</Text>
          //     </View>
          //   );
          // }}
        >
          {_.map(options, option => <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled} />)}
        </Picker>
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
          <Button text-14 light label='css3切换动画' marginT-10 onPress={() => navigate('Browser', {
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
