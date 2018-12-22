import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
export default class PlayBtn extends Component {
  static propTypes = {
    size: PropTypes.number,
    paused: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.object
  }
  static defaultProps={
    size: 36,
    paused: false
  }
  render () {
    const { size, onPress, paused, style } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.wrap, style, { width: size, height: size, borderRadius: size }]}>
        <Image style={styles.image} assetName={paused ? 'play' : 'paused'} />
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0,0,0,.65)',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
