import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { TextInput } from '../../react-native-ui-lib'
import { width, platform } from '../utils'
import { colors } from '../theme'
import PropTypes from 'prop-types'
export default class LoginInput extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    maxLength: PropTypes.number
  }
  static defaultProps={
    placeholder: '请输入手机号',
    maxLength: 11
  }
  _onChangeText = (e) => {
    const { onChangeText } = this.props
    onChangeText(e)
  }
  render () {
    const { onSubmitEditing, maxLength, placeholder } = this.props
    if (platform === 'android') {
      const shadowOpt = {
        width: width - 50,
        height: 32,
        color: colors.black,
        border: 30,
        radius: 16,
        opacity: 0.05,
        x: 0,
        y: 0,
        style: {
        }
      }
      return (
        <BoxShadow setting={shadowOpt}>
          <TextInput style={styles.wrap}
            text-14
            placeholder={placeholder}
            keyboardType='phone-pad'
            dark10
            onChangeText={this._onChangeText}
            returnKeyType='next'
            onSubmitEditing={onSubmitEditing}
            hideUnderline
            maxLength={maxLength}
          />
        </BoxShadow>

      )
    } else {
      return (
        <TextInput style={styles.wrap}
          text-14
          placeholder='请输入手机号'
          keyboardType='phone-pad'
          dark10
          onChangeText={this._onChangeText}
          returnKeyType='next'
          onSubmitEditing={onSubmitEditing}
          hideUnderline

        />
      )
    }
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.light,
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginBottom: 5,
    ...Platform.select({
      ios: {
        width: width - 50,
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 0 }
      }
    })
  }
})
