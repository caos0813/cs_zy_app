import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { TouchableOpacity, Text } from '../../react-native-ui-lib'
import { BoxShadow } from 'react-native-shadow'
import { width, platform } from '../utils'
import PropTypes from 'prop-types'
import { colors } from '../theme'
export default class ButtonCeil extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    enlish: PropTypes.string
  }
  static defaultProps = {
    isBadge: 'false'
  }
  render () {
    const { title, onPress, enlish } = this.props
    if (platform === 'android') {
      const shadowOpt = {
        width: width * 0.2,
        height: 40,
        color: colors.black,
        border: 8,
        radius: 15,
        opacity: 0.05,
        x: 0,
        y: 0,
        style: {
          marginHorizontal: '2%',
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
      return (
        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity style={[styles.wrap, title === '更多' ? styles.more : '']} onPress={onPress} activeOpacity={0.6}>
            <Text style={styles.enlish} text-26 gray>{enlish}</Text>
            <Text style={[styles.title, title === '更多' ? styles.more : '']} text-16>{title}</Text>
          </TouchableOpacity>
        </BoxShadow >
      )
    } else {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.wrap, title === '更多' ? styles.more : '']}>
          <Text style={styles.enlish} text-26 gray>{enlish}</Text>
          <Text style={[styles.title, title === '更多' ? styles.more : '']} text-16>{title}</Text>
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
    height: 40,
    justifyContent: 'center',
    backgroundColor: colors.light,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
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
    opacity: 0.2,
    transform: [{ rotateZ: '-20deg' }, { scaleX: 1.3 }]
  },
  more: {
    color: colors.light,
    backgroundColor: colors.calm
  }
})
