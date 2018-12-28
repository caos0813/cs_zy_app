import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
export default class itemHead extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  static defaultProps = {
    leftIcon: false,
    seeAll: false,
    smallText: false
  }
  trnsfromImage = (title) => {
    if (title === '生涯规划') {
      return 'article_title1'
    } else if (title === '文化素养') {
      return 'article_title3'
    } else if (title === '心理健康') {
      return 'article_title2'
    } else if (title === '行为习惯') {
      return 'article_title4'
    } else if (title === '学业能力') {
      return 'article_title5'
    }
  }
  renderTitle = (title) => {
    if (this.props.smallText) {
      return (
        <Text dark06 text-14 style={styles.text}>{title}</Text>
      )
    } else {
      return (
        <Text dark text-24 style={styles.text}>{title}</Text>
      )
    }
  }
  render () {
    const { title, style, onPress } = this.props
    return (
      <View row padding-15 style={[styles.wrap, style]}>
        <View row style={{ alignItems: 'center' }}>
          {this.props.leftIcon && <Image assetName={this.trnsfromImage(title)} style={{ marginRight: 10, width: 18, height: 18 }} />}
          {this.renderTitle(title)}
        </View>
        {this.props.seeAll === 'true' && <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
          <Text calm text-14>查看全部</Text>
        </TouchableOpacity>}
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
