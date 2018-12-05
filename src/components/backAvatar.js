import React, { Component } from 'react'
import { Avatar, Assets } from '../../react-native-ui-lib'
export default class BackAvatar extends Component {
  _onPress=() => {
    const { onPress } = this.props
    if (onPress) {
      onPress()
    }
  }
  render () {
    return (
      <Avatar imageSource={Assets.icons.backArrow} resizeMode='cover' backgroundColor='transparent' containerStyle={{ width: 40, height: 40 }} imageStyle={{ left: 15, top: 8 }} size={24} onPress={this._onPress} />
    )
  }
}
