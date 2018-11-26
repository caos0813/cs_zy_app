import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity } from '../../react-native-ui-lib/src'
import { inject, observer } from 'mobx-react/native'
import { CodeInput } from '../components'
import { api, axios, width, Toast } from '../utils'
import { StyleSheet, Keyboard } from 'react-native'
import Modal from 'react-native-modalbox'
import { BoxShadow } from 'react-native-shadow'
import { colors } from '../theme'
let timer
@inject('loginStore', 'userStore', 'routeStore')
@observer class Login extends Component {
  constructor (props) {
    super(props)
    // this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  sendSms = () => {
    const { phoneNum, setValue, countDown } = this.props.loginStore
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      Toast('手机格式错误')
    }
    Keyboard.dismiss()
    this.clearTimer()
    axios.get(`${api.sendSms}${phoneNum}`).then(data => {
      if (data.code === 'ok') {
        Toast('短信发送成功')
        this.refs.modal.open()
        setValue('tick', 90)
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
    const { getUserInfo, setUserInfo } = this.props.userStore
    const { replace } = this.props.navigation
    /* const { routes } = this.props.routeStore
    const preRoute = routes[routes.length - 2] */
    // const { params } = this.props.navigation.state
    if (verificationCode.length !== 6) {
      Toast('验证码长度不正确!')
      return
    }
    Keyboard.dismiss()
    axios.post(api.webLogin, {
      phoneNum: phoneNum,
      verificationCode: verificationCode
    }).then(data => {
      if (data.token) {
        Toast('登录成功')
        setUserInfo({
          token: data.token,
          level: data.level, // 会员等级
          isValid: data.isValid, // 会员是否可用
          dataFlag: data.dataFlag, // 是否完善信息
          userCenterId: data.userCenterId,
          phoneNum: data.phoneNum
        })
        /* 如果已完善用户信息 */
        if (data.dataFlag) {
          getUserInfo()
          replace('Home')
        } else {
          getUserInfo()
          replace('Info', {
            type: 'complete'
          })
        }
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

    const { phoneValid, setValue, tick, phoneNum, verificationCode } = this.props.loginStore
    const { push } = this.props.navigation
    return (
      <View flex useSafeArea paddingH-23 paddingT-20>
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
            <View center marginT-20 >
              <CodeInput
                ref='codeInput'
                activeColor={colors.calm}
                inactiveColor={colors.gray}
                className={'border-b'}
                space={12}
                size={34}
                codeLength={6}
                inputPosition='left'
                onFulfill={(code) => setValue('verificationCode', code)}
                codeInputStyle={{
                  fontSize: 32,
                  color: colors.calm
                }}
              />
            </View>
            <View paddingT-100 paddingH-5>
              <Button text-14 light label='登录' bg-calm marginT-10 onPress={this.login} disabled={verificationCode.length !== 6} />
              <TouchableOpacity activeOpacity={0.6} onPress={() => push('Browser', { path: 'agreement-regist' })}>
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
            <TextInput style={{ backgroundColor: colors.light, height: 32, borderRadius: 16, paddingHorizontal: 30, textAlign: 'center', marginBottom: 5 }}
              text-14
              placeholder='请输入手机号'
              keyboardType='phone-pad'
              // error={phoneErrorText}
              dark10
              onChangeText={val => setValue('phoneNum', val)}
              returnKeyType='next'
              onSubmitEditing={this.sendSms}
              hideUnderline

            />
          </BoxShadow>
        </View>
        <View paddingT-100 paddingH-5>
          <Button text-14 light label='下一步' bg-calm marginT-10 onPress={this.sendSms} disabled={phoneValid} />
        </View>
      </View >
    )
  }
  componentDidMount () {
    console.log('componentDidMount', this.props.routeStore.routes)
    // this.refs.modal.open()
  }
  componentWillUnmount () {
    const { setValue } = this.props.loginStore
    setValue('verificationCode', '')
    this.refs.codeInput && this.refs.codeInput.clear()
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
    zIndex: 99
  },
  codeInputWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#111',
    opacity: 0
  },
  codeInput: {
    textAlign: 'center'
  },
  codeCeil: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  codeText: {
    lineHeight: 36
  },
  codeLine: {
    position: 'absolute',
    left: 11,
    top: 17,
    height: 1,
    width: 32
  }
})
export default Login
