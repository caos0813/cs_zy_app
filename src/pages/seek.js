import React, { Component } from 'react'
import { View, Image } from '../../react-native-ui-lib'
export default class Seek extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View flex useSafeArea>
        <Image style={{ width: '100%', marginTop: 10 }} source={require('../assets/home/banner.png')} />
      </View>
    )
  }
}
