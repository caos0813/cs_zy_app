import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib/src'
import { StyleSheet } from 'react-native'
export default class itemHead extends Component {
  static defaultProps = {
    seeAll: false,
    leftIcon: false
  }
  render () {
    const { title, style } = this.props
    return (
      <View row padding-15 marginT-15 style={[styles.wrap, style]}>
        <View row style={{ alignItems: 'center' }}>
          {this.props.leftIcon && <Image assetName='vip' style={{ marginRight: 10 }} />}
          <Text dark text-24 style={styles.text}>{title}</Text>
        </View>
        {this.props.seeAll && <TouchableOpacity activeOpacity={0.6}>
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
