import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { api, axios, width, Toast } from '../utils'
import { StyleSheet, Keyboard, StatusBar } from 'react-native'
import Modal from 'react-native-modalbox'
import SplashScreen from 'react-native-splash-screen'
import { BoxShadow } from 'react-native-shadow'
import { colors } from '../theme'
let timer
@inject('loginStore', 'userStore')
@observer class Login extends Component {
  constructor (props) {
    super(props)
    // this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  sendSms = () => {
    const { phoneNum, setValue, countDown } = this.props.loginStore
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      Toast('手机格式错误')
      return
    }
    Keyboard.dismiss()
    this.clearTimer()
    axios.get(`${api.sendSms}${phoneNum}`).then(data => {
      if (data.code === 'ok') {
        Toast('短信发送成功')
        this.refs.modal.open()
        setValue('tick', 150)
        timer = setInterval(() => {
          countDown()
        }, 1000)
      } else {
        Toast(data.message)
      }
    }).catch(() => {
      Toast('请检查您的网络')
    })
  }
  clearTimer = () => {
    timer && clearInterval(timer)
  }
  login = () => {
    const { phoneNum, verificationCode } = this.props.loginStore
    const { goBack } = this.props.navigation
    Keyboard.dismiss()
    axios.post(api.webLogin, {
      phoneNum: phoneNum,
      verificationCode: verificationCode
    }).then(data => {
      if (data.token) {
        Toast('登录成功').then(data => {
          goBack()
        })
      } else {
        Toast(data.msg)
      }
    }).catch(() => {
      Toast('请检查您的网络')
    })
  }
  render () {
    /* setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.4 * Math.random()) })
    }, 1000) */
    const shadowOpt = {
      width: width - 50,
      height: 32,
      color: '#000',
      border: 30,
      radius: 16,
      opacity: 0.05,
      x: 0,
      y: 0,
      style: {
        height: 50
      }
    }

    const { phoneValid, phoneErrorText, setValue, tick, phoneNum, verificationCode } = this.props.loginStore
    return (
      <View flex paddingH-23 paddingT-20>
        <StatusBar barStyle='dark-content' />
        <Modal ref='modal' backdropPressToClose={false} swipeToClose={false} style={style.modal} >
          <View paddingH-23 paddingT-20 >
            <Text text-20 marginH-12 dark>{tick > 0 ? '验证码已经发送成功' : '验证码已过期'}</Text>
            <View row spread centerV paddingT-75 marginH-12>
              <Text text-16 marginT-6 dark06>{phoneNum}</Text>
              {
                tick > 0 ? <Button label={tick + 's'} size='small' text-16 marginT-10 borderRadius={10} bg-light dark06
                /> : <Button label='重新获取' size='small' text-16 marginT-10 borderRadius={10} onPress={this.sendSms}
                />
              }
            </View>
            <View center marginT-14>
              <TextInput placeholder='输入验证码' containerStyle={style.codeInputWrap} style={style.codeInput}
                onChangeText={val => setValue('verificationCode', val)}
                returnKeyType='done'
                onSubmitEditing={this.login}
                //  style={{ backgroundColor: colors.positive }}
                // hideUnderline
              />

              {/* <Button label='点击按钮代表同意《知涯用户协议》' text-10 marginT-20 dark09 link
              /> */}
            </View>
            <View paddingT-100 paddingH-5>
              <Button text-14 light label='登录' bg-calm marginT-10 onPress={this.sendSms} disabled={verificationCode.length > 0} />
              <TouchableOpacity activeOpacity={0.6}>
                <View padding-10 center>
                  <Text text-12 gray>点击按钮表示同意<Text calm>《知涯用户协议》</Text></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text text-20 marginH-12 dark>欢迎使用知涯志愿</Text>
        <Text marginT-75 marginH-12 text-16 dark06>请输入您的手机号码</Text>
        <View paddingT-23>
          <BoxShadow setting={shadowOpt}>
            <TextInput style={{ backgroundColor: colors.light, height: 32, borderRadius: 16, paddingHorizontal: 30, textAlign: 'center', marginBottom: 5 }} hideUnderline text-14 placeholder='请输入手机号' keyboardType='phone-pad' error={phoneErrorText} dark10 onChangeText={val => setValue('phoneNum', val)} returnKeyType='next' onSubmitEditing={this.sendSms} />
          </BoxShadow>
        </View>
        <View paddingT-100 paddingH-5>
          <Button text-14 light label='下一步' bg-calm marginT-10 onPress={this.sendSms} disabled={phoneValid} />
        </View>
      </View >
    )
  }
  componentDidMount () {
    // this.refs.modal.open()
    SplashScreen.hide()
  }
  componentWillUnmount () {
    this.clearTimer()
  }
}
const style = StyleSheet.create({
  modal: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1001
  },
  codeInputWrap: {
    width: 200
  },
  codeInput: {
    textAlign: 'center'
  }
})
export default Login
