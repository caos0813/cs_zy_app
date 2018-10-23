import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native-ui-lib'
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
      <View flex paddingH-20 paddingT-20>
        <Text text-18 dark>欢迎使用知涯志愿</Text>
        <View paddingT-20>
          <TextInput text-15 placeholder='请输入手机号' dark10 keyboardType='phone-pad' />
        </View>
        <View center>
          <Button text-14 light label='下一步' marginT-10 onPress={() => navigate('Browser')} />
        </View>

      </View>
    )
  }
}
