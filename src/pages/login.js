import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native-ui-lib'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { api, axios, toast, platform } from '../utils'
import { StyleSheet, Animated, BackHandler } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Modal from 'react-native-root-modal'
let timer
class Store {
  @observable phoneNum = ''
  @observable verificationCode = ''
  @observable tick = 150
  @observable modalFlag = false
  /* 手机错误提示 */
  @computed get phoneErrorText () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNum)) && this.phoneNum) {
      return '手机号码格式错误'
    }
  };
  /* 是否禁用下一步按钮  */
  @computed get phoneValid () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNum))) {
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
  constructor (props) {
    super(props)
    this.state = {
      scale: new Animated.Value(1)
    }
  }
  sendSms = () => {
    this.clearTimer()
    axios.get(`${api.sendSms}${store.phoneNum}`).then(data => {
      if (data.code === 'ok') {
        toast('验证码已发送成功！').then(() => {
          this.showModal()
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
  showModal = () => {
    store.setValue('modalFlag', true)
    this.state.scale.setValue(0)
    Animated.spring(this.state.scale, {
      toValue: 1
    }).start()
  }
  hideModal = () => {
    Animated.timing(this.state.scale, {
      toValue: 0
    }).start(() => {
      store.setValue('modalFlag', false)
    })
  }
  login = () => {
    const { phoneNum, verificationCode } = store
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
  componentDidMount () {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (store.modalFlag) {
        store.setValue('modalFlag', false)
        return true
      } else {
        this.props.navigation.goBack()
        return false
      }
    })
  }
  componentWillUnmount () {
    this.clearTimer()
    if (platform === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => { })
    }
  }
  render () {
    /* setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.4 * Math.random()) })
    }, 1000) */
    const { phoneValid, modalFlag, phoneErrorText, setValue, tick, verificationCode } = store
    return (
      <View flex paddingH-20 paddingT-20>
        {modalFlag && <Text>12112</Text>}
        <Animated.Modal style={[style.modal, {
          transform: [
            {
              scale: this.state.scale
            }
          ]
        }]} visible={modalFlag} >
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
        </Animated.Modal>
        <Text text-18 dark>欢迎使用知涯志愿</Text>
        <View paddingT-20>
          <TextInput text-15 placeholder='请输入手机号' keyboardType='phone-pad' error={phoneErrorText} dark10 onChangeText={val => setValue('phoneNum', val)} />
        </View>
        <View paddingH-100>
          <Button text-14 light label='下一步' marginT-10 onPress={this.sendSms} disabled={phoneValid} />
        </View>

      </View>
    )
  }
}
const style = StyleSheet.create({
  modal: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  codeInputWrap: {
    width: 200
  },
  codeInput: {
    textAlign: 'center'
  }
})
export default Login
