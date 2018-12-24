import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
import { BlurView } from 'react-native-blur'
export default class PlayBtn extends Component {
  static propTypes = {
    size: PropTypes.number,
    paused: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.object,
    activeOpacity: PropTypes.number
  }
  static defaultProps = {
    size: 36,
    paused: false,
    activeOpacity: 0.6
  }
  render () {
    const { activeOpacity, size, onPress, paused, style, viewRef } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} style={[styles.wrap, style, { width: size, height: size, borderRadius: size }]}>
        {viewRef && <BlurView
          viewRef={viewRef}
          blurType='light'
          blurAmount={2}
          overlayColor='transparent'
          blurRadius={1}
        />}
        <Image style={styles.image} assetName={paused ? 'play' : 'paused'} />
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    // backgroundColor: 'rgba(0,0,0,.65)',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
