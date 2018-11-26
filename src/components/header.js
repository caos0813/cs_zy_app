import React, { Component } from 'react'
import { View, Text, Avatar, Assets } from '../../react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { colors } from '../theme'
export default class Header extends Component {
  render () {
    return (
      <View row centerV style={styles.header}>
        <Avatar imageSource={Assets.icons.backArrow} backgroundColor='transparent' containerStyle={styles.avatarWrap} imageStyle={styles.avatarImage} />
        <View style={styles.titleWrap}>
          <Text text-18 dark>12</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  avatarWrap: {
    width: 40,
    zIndex: 1,
    height: 40
  },
  titleWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  avatarImage: {
    width: 24,
    marginTop: 8,
    marginLeft: 8,
    height: 24
  },
  header: {
    backgroundColor: colors.light,
    height: 50
  }
})
