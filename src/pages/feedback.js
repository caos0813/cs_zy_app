import React, { Component } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { View, TextArea, Button, Text } from '../../react-native-ui-lib'
import { ratio, api, axios, Toast } from '../utils'
import { colors } from '../theme'
@inject('userStore')
@observer class Feedback extends Component {
  constructor (props) {
    super(props)
    this.state = {
      feedback: ''
    }
  }
  onChangeText = (e) => {
    this.setState({
      feedback: e
    })
  }
  submit = () => {
    const { goBack } = this.props.navigation
    Keyboard.dismiss()
    const { userInfo } = this.props.userStore
    if (this.state.feedback.length > 500) {
      Toast('最多输入500字')
      return
    }
    axios.post(api.feedback, {
      name: userInfo.name,
      phoneNum: userInfo.phoneNumber,
      source: '知涯志愿app',
      content: this.state.feedback
    }).then(data => {
      goBack()
      Toast('提交成功')
    }).catch(() => {
      Toast('提交失败')
    })
  }
  render () {
    return (
      <View flex useSafeArea >
        <View style={styles.textArea} >
          <TextArea placeholder='请输入文字' value={this.state.feedback} onChangeText={this.onChangeText} text-16 />
        </View>
        <View right paddingV-10 paddingH-20><Text>{500 - this.state.feedback.length}/500</Text></View>
        <View padding-25><Button label='提交' bg-calm onPress={this.submit} /></View>
      </View>
    )
  }
}
export default Feedback
const styles = StyleSheet.create({
  textArea: {
    backgroundColor: colors.stable,
    borderBottomWidth: 1 / ratio,
    height: 200,
    borderColor: colors.grey
  }
})
