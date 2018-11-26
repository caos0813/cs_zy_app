import React, { Component } from 'react'
import { View, Text } from '../../react-native-ui-lib/src'
import { StyleSheet } from 'react-native'
export default class itemHead extends Component {
  render () {
    const { title, style } = this.props
    return (
      <View row padding-15 style={[styles.wrap, style]}>
        <Text dark text-24 style={styles.text}>{title}</Text>
        {/* <Image assetName='cycle' style={styles.icon} /> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
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
