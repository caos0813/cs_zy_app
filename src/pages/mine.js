import React, { Component } from 'react'
import { Text, View } from 'react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import SplashScreen from 'react-native-splash-screen'
@inject('userStore')

@observer class Info extends Component {
  render () {
    return (
      <View flex useSafeArea>
        <Text> textInComponent </Text>
      </View>
    )
  }
  componentDidMount () {
    // this.refs.modal.open()
    SplashScreen.hide()
  }
}
export default Info
