import React, { Component } from 'react'
import { View, Text } from 'react-native'
export default class Home extends Component {
  render () {
    return (
      <View style={{ 'flex': 1, 'backgroundColor': '#111' }}>
        <Text>我是首页</Text>
      </View>
    )
  }
}
