import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native-ui-lib'
export default class Login extends Component {
  constructor (props) {
    super(props)
    /* this.state = {
      progress: 0
    } */
  }

  render () {
    /* setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.4 * Math.random()) })
    }, 1000) */
    const { navigate } = this.props.navigation
    return (
      <View flex paddingH-10 paddingT-20>
        <TextInput text-15 placeholder='请输入手机号' dark10 keyboardType='phone-pad' />
        <TextInput text-15 placeholder='请输入密码' secureTextEntry dark10 />
        <View marginT-20 >
          <Button text-14 light bg-positive label='登录' br20 />
        </View>
        <View right>
          <Button link text-14 positive label='忘记密码?' marginT-10 onPress={() => navigate('Browser')} />
        </View>
      </View>
    )
  }
}
