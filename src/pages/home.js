import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native-ui-lib'
import {
  StyleSheet
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import SplashScreen from 'react-native-splash-screen'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: false
    }
  }
  componentDidMount () {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  }
  setShow = () => {
    this.setState({
      camera: true
    })
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <View flex paddingH-10 paddingT-20>
        <TextInput text-15 placeholder='请输入手机号' dark10 keyboardType='phone-pad' />
        <TextInput text-15 placeholder='请输入密码' secureTextEntry dark10 />
        <View marginT-20 >
          <Button text-14 light bg-positive label='登录' onPress={() => {
            navigate('Login')
          }} br20 />
        </View>
        <View right>
          <Button link text-14 positive label='忘记密码?' marginT-10 onPress={() => {
            this.setState({
              camera: true
            })
          }} />
        </View>
        {this.state.camera && <RNCamera
          ref={'camera'}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />}
      </View>
    )
  }

  takePicture = async () => {
    const options = { quality: 0.5, base64: true }
    const data = await this.refs.camera.takePictureAsync(options)
    alert(data.uri)
  }
}

const styles = StyleSheet.create({
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
