import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { api, axios, toast } from '../utils'
import { StyleSheet, Keyboard } from 'react-native'
import Modal from 'react-native-modalbox'
let timer
@inject('loginStore', 'userStore')
@observer class Login extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    console.log(this.props)
    // this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  sendSms = () => {
    const { phoneNum, setValue, countDown } = this.props.loginStore
    Keyboard.dismiss()
    this.clearTimer()
    axios.get(`${api.sendSms}${phoneNum}`).then(data => {
      if (data.code === 'ok') {
        toast('验证码已发送成功！').then(() => {
          this.refs.modal.open()
          setValue('tick', 150)
          timer = setInterval(() => {
            countDown()
          }, 1000)
        })
      } else {
        toast(data.message)
      }
    }).catch(() => {
      toast('请检查您的网络')
    })
  }
  clearTimer = () => {
    timer && clearInterval(timer)
  }
  login = () => {
    const { phoneNum, verificationCode } = this.props.loginStore
    axios.post(api.webLogin, {
      phoneNum: phoneNum,
      verificationCode: verificationCode
    }).then(data => {
      if (data.token) {
        toast('登录成功')
      } else {
        toast(data.msg)
      }
    }).catch(() => {
      toast('请检查您的网络')
    })
  }
  render () {
    /* setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.4 * Math.random()) })
    }, 1000) */
    const { phoneValid, phoneErrorText, setValue, tick, verificationCode } = this.props.loginStore
    return (
      <View flex paddingH-20 paddingT-20>
        <Modal ref='modal' backdropPressToClose={false} swipeToClose={false} style={style.modal} >
          <View paddingH-20 paddingT-20 >
            <Text text-18 dark>验证码已发送</Text>
            <View row spread centerV paddingV-20>
              <Text text-15 marginT-6>13786114846</Text>
              {
                tick > 0 ? <Button label={tick + 's'} size='small' text-14 marginT-10 borderRadius={10} bg-light dark
                /> : <Button label='重新获取' size='small' text-14 marginT-10 borderRadius={10} onPress={this.sendSms}
                />
              }
            </View>
            <View center>
              <TextInput placeholder='输入验证码' containerStyle={style.codeInputWrap} style={style.codeInput}
                onChangeText={val => setValue('verificationCode', val)}
              />
              <Button label='登录' text-14 marginT-10 borderRadius={10} style={{ width: 150, height: 40 }}
                disabled={verificationCode.length <= 0}
                onPress={this.login}
              />
              <Button label='点击按钮代表同意《知涯用户协议》' text-10 marginT-20 dark09 link
              />
            </View>
          </View>
        </Modal>
        <Text text-18 dark>欢迎使用知涯志愿</Text>
        <View paddingT-20>
          <TextInput text-15 placeholder='请输入手机号' keyboardType='phone-pad' error={phoneErrorText} dark10 onChangeText={val => setValue('phoneNum', val)} />
        </View>
        <View paddingH-100>
          <Button text-14 light label='下一步' marginT-10 onPress={this.sendSms} disabled={phoneValid} />
        </View>

      </View >
    )
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
