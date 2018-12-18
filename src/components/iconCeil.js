import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
export default class IconCeil extends Component {
  static propTypes={
    title: PropTypes.string
  }
  render () {
    const { imageSource, title } = this.props
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.wrap}>
        <Image source={imageSource} />
        <Text text-12 dark06>{title}</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center'
  }
})
