import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { width, platform } from '../utils'
import { colors } from '../theme'
import PropTypes from 'prop-types'
import ImageCapInset from 'react-native-image-capinsets'
export default class HomeSearch extends Component {
  static propTypes={
    onPress: PropTypes.func
  }
  render () {
    const { onPress } = this.props
    if (platform === 'android') {
      return (
        <ImageCapInset
          source={{ uri: 'bg' }}
          style={styles.androidShadow}
          capInsets={{ top: 0, bottom: 0, right: 25, left: 25 }}
        >
          <TouchableOpacity style={[styles.searchInput]} activeOpacity={0.6} onPress={onPress}>
            <Image assetName='searchIcon' style={styles.searchIcon} tintColor={colors.dark} />
            <Text text-14 dark06>搜索一下</Text>
          </TouchableOpacity>
        </ImageCapInset>
      )
    } else {
      return (
        <View>
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
  androidShadow: {
    width: '100%'
  },
  searchInput: {
    paddingHorizontal: 48,
    justifyContent: 'center',
    width: '100%',
    // elevation: 10,
    ...Platform.select({
      android: {
        height: 58,
        backgroundColor: 'transparent'
      },
      ios: {
        borderRadius: 20,
        height: 30,
        backgroundColor: colors.light,
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
    left: 15,
    ...Platform.select({
      android: {
        top: 21,
        left: 25
      }
    })
  }
})
