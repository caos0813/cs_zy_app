import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { width, platform } from '../utils'
import { colors } from '../theme'
import PropTypes from 'prop-types'
export default class HomeSearch extends Component {
  static propTypes={
    onPress: PropTypes.func
  }
  render () {
    const { onPress } = this.props
    if (platform === 'android') {
      const shadowOpt = {
        width: width - 30,
        height: 30,
        color: colors.black,
        border: 15,
        radius: 15,
        opacity: 0.05,
        x: 0,
        y: 0,
        style: {
          // marginLeft: 15
        }
      }
      return (
        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity style={[styles.searchInput]} activeOpacity={0.6} onPress={onPress}>
            <Image assetName='searchIcon' style={styles.searchIcon} tintColor={colors.dark} />
            <Text text-14 dark06>搜索一下</Text>
          </TouchableOpacity>
        </BoxShadow>
      )
    } else {
      return (
        <View style={{ width: width - 30 }}>
          <TouchableOpacity style={[styles.searchInput]} activeOpacity={0.6} onPress={onPress}>
            <Image assetName='searchIcon' style={styles.searchIcon} tintColor={colors.dark} />
            <Text text-14 dark06>搜索一下</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 20,
    paddingHorizontal: 48,
    height: 30,
    justifyContent: 'center',
    backgroundColor: colors.light,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 0 }
      }
    })
  },
  searchIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: 7,
    left: 15
  }
})
