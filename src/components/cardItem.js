import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity, View, Text } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
export default class CardItem extends Component {
  static propTypes={
    title: PropTypes.string,
    desc: PropTypes.string,
    imageStyle: PropTypes.object
  }
  render () {
    const { imageSource, title, desc, children, imageStyle } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.wrap}>
        <Image source={imageSource} style={[styles.image, imageStyle]} />
        <Text text-16 dark numberOfLines={1} marginV-5>{title}</Text>
        <Text text-12 dark06 numberOfLines={2}>{desc}</Text>
        {children && <View>{children}</View>}
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 85,
    borderRadius: 8
  },
  wrap: {
    // alignItems: 'center'
  }
})
