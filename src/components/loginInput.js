import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { TextInput } from '../../react-native-ui-lib'
import { width, platform } from '../utils'
import { colors } from '../theme'
import PropTypes from 'prop-types'
import ImageCapInset from 'react-native-image-capinsets'
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
      return (
        <ImageCapInset
          source={{ uri: 'bg' }}
          style={{ width: '100%' }}
          capInsets={{ top: 0, bottom: 0, right: 25, left: 25 }}
        >
          <TextInput style={styles.wrap}
            text-14
            placeholder={placeholder}
            keyboardType='phone-pad'
            dark10
            onChangeText={this._onChangeText}
            returnKeyType='next'
            onSubmitEditing={onSubmitEditing}
            hideUnderline
            enableErrors={false}
            maxLength={maxLength}
          />
        </ImageCapInset>

      )
    } else {
      return (
        <TextInput style={styles.wrap}
          text-14
          placeholder={placeholder}
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
    ...Platform.select({
      android: {
        height: 50,
        paddingBottom: 5,
        backgroundColor: 'transparent'
      },
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
