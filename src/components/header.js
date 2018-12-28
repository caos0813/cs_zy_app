import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { colors } from '../theme'
import { statusBarHeight, navigator } from '../utils'
import PropTypes from 'prop-types'
export default class Header extends Component {
  static propTypes={
    showLeft: PropTypes.bool,
    showRight: PropTypes.bool,
    title: PropTypes.string,
    titleContainer: PropTypes.element,
    containerStyle: PropTypes.object,
    tintColor: PropTypes.string,
    btnStyle: PropTypes.object,
    leftContainer: PropTypes.element,
    leftPress: PropTypes.func
  }
  static defaultProps={
    showLeft: true,
    showRight: false,
    tintColor: '#666'
  }
  leftPress=() => {
    alert(111)
    const { leftPress } = this.props
    leftPress ? leftPress() : navigator.goBack()
  }
  render () {
    const { leftPress, title, showLeft, titleContainer, containerStyle, showRight, tintColor, btnStyle, leftContainer } = this.props
    return (
      <View row centerV style={[styles.header, containerStyle]}>
        <View style={[styles.btnWrap, btnStyle]}>
          {showLeft &&
          <TouchableOpacity activeOpacity={0.6} onPress={this.leftPress}>
            {leftContainer || <Image assetName='backArrow' style={styles.backImage} tintColor={tintColor} />}
          </TouchableOpacity>
          }
        </View>
        <View style={[styles.titleWrap, styles.positionTop]}>
          {titleContainer || <Text text-18 dark>{title}</Text>}
        </View>
        <View style={styles.btnWrap}>
          {showRight &&
          <TouchableOpacity activeOpacity={0.6} onPress={leftPress}>
            <Image assetName='backArrow' style={styles.backImage} tintColor={tintColor} />
          </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  btnWrap: {
    width: 36,
    height: 36,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backImage: {
    marginLeft: -1.5,
    width: 16,
    height: 16
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
