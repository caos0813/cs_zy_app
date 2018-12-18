import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { colors } from '../theme'
import { statusBarHeight } from '../utils'
import PropTypes from 'prop-types'
export default class Header extends Component {
  static propTypes={
    showLeft: PropTypes.bool,
    showRight: PropTypes.bool,
    leftPress: PropTypes.func,
    title: PropTypes.string,
    titleContainer: PropTypes.element,
    containerStyle: PropTypes.object
  }
  static defaultProps={
    showLeft: true,
    showRight: false
  }
  render () {
    const { leftPress, title, showLeft, titleContainer, containerStyle, showRight } = this.props
    return (
      <View row centerV style={[styles.header, containerStyle]}>
        <View style={styles.btnWrap}>
          {showLeft &&
          <TouchableOpacity activeOpacity={0.6} onPress={leftPress}>
            <Image assetName='backArrow' style={styles.backImage} />
          </TouchableOpacity>
          }
        </View>
        <View style={[styles.titleWrap, styles.positionTop]}>
          {titleContainer || <Text text-18 dark>{title}</Text>}
        </View>
        <View style={styles.btnWrap}>
          {showRight &&
          <TouchableOpacity activeOpacity={0.6} onPress={leftPress}>
            <Image assetName='backArrow' style={styles.backImage} />
          </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  btnWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backImage: {
    width: 24,
    height: 24
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  header: {
    width: '100%',
    backgroundColor: colors.light,
    paddingTop: statusBarHeight,
    height: 50 + statusBarHeight
  },
  positionTop: {
  }
})
