import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity, Text, View } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
@inject('userStore')
@observer class IconCeil extends Component {
  static propTypes = {
    title: PropTypes.string,
    opacity: PropTypes.number,
    onPress: PropTypes.func,
    isBadge: PropTypes.string
  }
  static defaultProps = {
    opacity: 0.6,
    isBadge: 'false'
  }
  renderBadge = () => {
    const { userInfo } = this.props.userStore
    const { level, isValid, token } = userInfo
    if (token) {
      if (!level || (level === 'EXPERIENCE' && isValid)) {
        return (
          <View bg-assertive paddingH-6 paddingV-2 borderRadius={8} style={{ position: 'absolute', top: 0, right: 10 }}>
            <Text light text-12>免费体验</Text>
          </View>
        )
      } else if ((level === 'ZHI_YUAN' || level === 'FULL_FEATURED') && isValid) {
        return (
          <View bg-assertive paddingH-6 paddingV-2 borderRadius={10} style={{ position: 'absolute', top: 0, right: 10 }}>
            <Text light text-12>VIP</Text>
          </View>
        )
      }
    }
    return null
  }
  render () {
    const { imageSource, title, opacity, iconButton, onPress, isBadge } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={opacity} style={[styles.wrap, iconButton]}>
        <Image source={imageSource} />
        <Text text-12 dark06>{title}</Text>
        {isBadge === 'true' && this.renderBadge()}
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center'
  }
})
export default IconCeil
