import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio } from '../utils'
import PropTypes from 'prop-types'
export default class Footer extends Component {
  static propTypes = {
    id: PropTypes.string,
    isPrise: PropTypes.string,
    commentNumber: PropTypes.func,
    showLink: PropTypes.bool,
    onPress: PropTypes.func
  }
  static defaultProps = {
    showLink: true
  }
  render () {
    const { isPrise, commentNumber, showLink, onPress } = this.props
    return (
      <View style={styles.footer} >
        {showLink &&
        <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil} onPress={() => onPress('detail')}>
          <Image assetName='detail' />
        </TouchableOpacity>
        }
        <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil} onPress={() => onPress('attention')}>
          <Image assetName='attention' tintColor={isPrise ? colors.assertive : colors.dark} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil} onPress={() => onPress('comment')}>
          <Image assetName='comment' />
          <Text text-14 dark06 marginL-5>{commentNumber}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil} onPress={() => onPress('share')}>
          <Image assetName='share' />
        </TouchableOpacity>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  footer: {
    borderTopColor: colors.grey,
    borderTopWidth: 1 / ratio,
    flexDirection: 'row',
    height: 50
  },
  footerCeil: {
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
