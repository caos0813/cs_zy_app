import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { colors } from '../theme/index'
import PropTypes from 'prop-types'
export default class itemHead extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  static defaultProps = {
    leftIcon: false,
    seeAll: false
  }
  renderTitle = (title) => {
    if (this.props.seeAll) {
      return (
        <Text dark text-24 style={styles.text}>{title}</Text>
      )
    } else {
      return (
        <Text dark06 text-14 style={styles.text}>{title}</Text>
      )
    }
  }
  render () {
    const { title, style, onPress } = this.props
    return (
      <View row padding-15 style={[styles.wrap, style]}>
        <View row style={{ alignItems: 'center' }}>
          {this.props.leftIcon && <Image assetName='class' style={{ marginRight: 10 }} tintColor={colors.calm} />}
          {this.renderTitle(title)}
        </View>
        {this.props.seeAll === 'true' && <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
          <Text calm text-14>查看全部</Text>
        </TouchableOpacity>}
        {/* <Image assetName='cycle' style={styles.icon} /> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'space-between',
    alignItems: 'center'
    //  paddingVertical: 15
  },
  text: {
    fontWeight: '400',
    zIndex: 2
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: -6,
    zIndex: 1
  }
})
