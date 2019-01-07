import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { TouchableOpacity, Text } from '../../react-native-ui-lib'
import ImageCapInset from 'react-native-image-capinsets'
import { platform } from '../utils'
import PropTypes from 'prop-types'
import { colors } from '../theme'
export default class ButtonCeil extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func
  }
  static defaultProps = {
    isBadge: 'false'
  }
  render () {
    const { title, onPress } = this.props
    if (platform === 'android') {
      return (
        <ImageCapInset
          source={{ uri: 'cycle' }}
          style={{ width: '25%' }}
          capInsets={{ top: 0, bottom: 0, right: 20, left: 20 }}
        >
          <TouchableOpacity style={[styles.wrap, title === '更多' ? styles.more : '']} onPress={onPress} activeOpacity={0.6}>
            {/* <Text numberOfLines={1} style={styles.enlish} text-26 gray>{enlish}</Text> */}
            <Text numberOfLines={1} style={[styles.title, title === '更多' ? styles.more : '']} text-16>{title}</Text>
          </TouchableOpacity>
        </ImageCapInset >
      )
    } else {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.wrap, title === '更多' ? styles.more : '']}>
          {/* <Text numberOfLines={1} style={styles.enlish} text-26 gray>{enlish}</Text> */}
          <Text numberOfLines={1} style={[styles.title, title === '更多' ? styles.more : '']} text-16>{title}</Text>
        </TouchableOpacity >
      )
    }
  }
}
const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        paddingHorizontal: 20,
        height: 65
      },
      ios: {
        height: 40,
        backgroundColor: colors.light,
        width: '25%',
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 0 }
      }
    })
  },
  title: {
    color: colors.dark,
    position: 'absolute'
  },
  enlish: {
    position: 'absolute',
    opacity: 0.1,
    transform: [{ rotateZ: '-20deg' }, { scaleX: 1.3 }]
  },
  more: {
    color: colors.light,
    backgroundColor: colors.calm
  }
})
