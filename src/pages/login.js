import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from '../../react-native-ui-lib/src'
import { inject, observer } from 'mobx-react/native'
import { CodeInput, LoginInput } from '../components'
import { api, axios, Toast, height } from '../utils'
import { StyleSheet, Keyboard, AppState } from 'react-native'
import { NavigationActions } from 'react-navigation'
import BackgroundTimer from 'react-native-background-timer'
import Modal from 'react-native-modalbox'
import { colors } from '../theme'
let timer
@inject('loginStore', 'userStore', 'routeStore')
@observer class Login extends Component {
  constructor (props) {
    super(props)
    // this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  sendSms = (flag) => {
    const { phoneNum, setValue, countDown } = this.props.loginStore
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      Toast('手机格式错误')
    }
    Keyboard.dismiss()
    this.clearTimer()
    setValue('nextPressed', true)
    axios.get(`${api.sendSms}${phoneNum}`).then(data => {
      if (data.code === 'ok') {
        Toast('短信发送成功')
        this.refs.modal.open()
        setValue('tick', 90)
        timer = setInterval(() => {
          countDown()
        }, 1000)
        if (flag) {
          setValue('nextPressed', false)
        }
      } else {
        setValue('nextPressed', false)
        Toast(data.message)
      }
    }).catch(() => {
      Toast('请检查您的网络')
      setValue('nextPressed', false)
    })
  }
  onOpened = () => {
    const { setValue } = this.props.loginStore
    setValue('nextPressed', false)
  }
  clearTimer = () => {
    timer && clearInterval(timer)
  }
  login = () => {
    const { phoneNum, verificationCode } = this.props.loginStore
    const { getUserInfo, setUserInfo } = this.props.userStore
    const { reset } = this.props.navigation
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
          reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
        } else {
          getUserInfo()
          reset([NavigationActions.navigate({ routeName: 'Info', params: { type: 'complete' } })], 0)
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

    const { phoneValid, setValue, tick, phoneNum, verificationCode, nextPressed } = this.props.loginStore
    const { push } = this.props.navigation
    return (
      <View flex useSafeArea>
        <Modal ref='modal' backdropPressToClose={false} swipeToClose={false} style={style.modal}
          backdropOpacity={0}
          keyboardTopOffset={0}
          backdropColor={colors.black}
          onOpened={this.onOpened}>
          <View paddingH-23 paddingT-20 >
            <Text text-20 marginH-12 dark>{tick > 0 ? '验证码已经发送成功' : '验证码已过期'}</Text>
            <View row spread centerV paddingT-75 marginH-12>
              <Text text-16 marginT-6 dark06>{phoneNum}</Text>
              {
                tick > 0 ? <Button label={tick + 's'} size='small' text-16 marginT-10 borderRadius={10} bg-light dark06
                /> : <Button label='重新获取' size='small' text-16 marginT-10 borderRadius={10} disabled={nextPressed} onPress={() => this.sendSms(true)}
                />
              }
            </View>
            <View center marginT-20 style={{ height: 60 }}>
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
        <Text text-20 marginH-35 marginT-20 dark>欢迎使用知涯志愿</Text>
        <Text marginT-75 marginH-35 text-16 dark06>请输入您的手机号码</Text>
        <View paddingT-23 paddingH-23>
          <LoginInput onChangeText={val => setValue('phoneNum', val)} onSubmitEditing={this.sendSms} />
        </View>
        <View paddingT-100 paddingH-28>
          <Button text-14 light label='下一步' bg-calm marginT-10 onPress={this.sendSms} disabled={phoneValid || nextPressed} />
        </View>
      </View >
    )
  }
  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState)
    if (nextAppState === 'background') {
      const { countDown } = this.props.loginStore
      BackgroundTimer.runBackgroundTimer(() => {
        timer && countDown()
        // code that will be called every 3 seconds
      },
      1000)
    } else {
      BackgroundTimer.stopBackgroundTimer()
    }
  }
  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount () {
    const { setValue } = this.props.loginStore
    setValue('verificationCode', '')
    this.refs.codeInput && this.refs.codeInput.clear()
    this.clearTimer()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }
}
const style = StyleSheet.create({
  modal: {
    top: 0,
    left: 0,
    height: height,
    width: '100%',
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
