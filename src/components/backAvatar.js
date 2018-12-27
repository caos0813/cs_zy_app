import React, { Component } from 'react'
import { TouchableOpacity, Image } from '../../react-native-ui-lib'
import { colors } from '../theme'
export default class BackAvatar extends Component {
  static defaultProps={
    assetName: 'backArrow'
  }
  _onPress = () => {
    const { onPress } = this.props
    if (onPress) {
      onPress()
    }
  }
  render () {
    return (
      <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={this._onPress}>
        <Image assetName={this.props.assetName} tintColor={colors.dark} />
      </TouchableOpacity>
    )
  }
}
