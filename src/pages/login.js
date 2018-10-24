import React, { Component } from 'react'
import { View, Text, Button, Modal, TextInput } from 'react-native-ui-lib'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { api, axios, toast } from '../utils'
import { StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
let timer
class Store {
  @observable phoneNumber = '13786114846'
  @observable tick = 150
  @observable modalFlag = true
  /* 手机错误提示 */
  @computed get phoneErrorText () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNumber)) && this.phoneNumber) {
      return '手机号码格式错误'
    }
  };
  /* 是否禁用一步按钮  */
  @computed get phoneValid () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
      return true
    } else {
      return false
    }
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  @action.bound
  countDown () {
    if (this.tick > 0) {
      this.tick--
    }
  }
}
const store = new Store()
@observer class Login extends Component {
  sendSms = () => {
    this.clearTimer()
    axios.get(`${api.sendSms}${store.phoneNumber}`).then(data => {
      if (data.code === 'ok') {
        toast('验证码已发送成功！').then(() => {
          store.setValue('modalFlag', true)
          store.setValue('tick', 150)
          timer = setInterval(() => {
            store.countDown()
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
  componentDidMount () {
    SplashScreen.hide()
    this.clearTimer()
    /* axios.get(api.provinces).then(data => {
      alert(JSON.stringify(data))
    }).catch(err => {
      alert(JSON.stringify(err))
    }) */
    // alert(global.token)
  }
  render () {
    /* setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.4 * Math.random()) })
    }, 1000) */
    const { phoneValid, modalFlag, phoneErrorText, setValue, tick } = store
    return (
      <View flex paddingH-20 paddingT-20>
        <Text>{phoneValid}</Text>
        <Modal visible={modalFlag} onRequestClose={() => {
          this.clearTimer()
          setValue('modalFlag', false)
        }} animationType='slide' presentationStyle='fullScreen' >
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
              <TextInput placeholder='输入验证码' containerStyle={style.codeInputWrap} style={style.codeInput} />
              <Button label='登录' text-14 marginT-10 borderRadius={10} style={{ width: 150, height: 40 }}
              />
              <Button label='点击按钮代表同意《知涯用户协议》' text-10 marginT-20 dark09 link
              />
            </View>
          </View>
        </Modal>
        <Text text-18 dark>欢迎使用知涯志愿</Text>
        <View paddingT-20>
          <TextInput text-15 placeholder='请输入手机号' keyboardType='phone-pad' error={phoneErrorText} dark10 onChangeText={val => setValue('phoneNumber', val)} />
        </View>
        <View paddingH-100>
          <Button text-14 light label='下一步' marginT-10 onPress={this.sendSms} disabled={phoneValid} />
        </View>

      </View>
    )
  }
}
const style = StyleSheet.create({
  codeInputWrap: {
    width: 200
  },
  codeInput: {
    textAlign: 'center'
  }
})
export default Login
