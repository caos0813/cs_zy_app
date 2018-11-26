import React, { Component } from 'react'
import { View, Text } from '../../react-native-ui-lib/src'
import { ActivityIndicator } from 'react-native'
import { colors } from '../theme'
export default class LoadMore extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '正在加载...',
      loading: true,
      show: true
    }
  }
  start () {
    this.setState({
      text: '正在加载...',
      loading: true,
      show: true
    })
  }
  end (page, totalPage) {
    if (page === totalPage - 1 && page !== 0) {
      this.setState({
        text: '--我是有底线的--',
        loading: false,
        show: true
      })
    } else if (totalPage === 0) {
      this.setState({
        text: '--没有找到数据--',
        loading: false,
        show: true
      })
    } else {
      this.setState({
        show: false
      })
    }
  }
  render () {
    const { text, show, loading } = this.state
    return (
      <View>
        {show && <View row center padding-15>
          {loading &&
          <ActivityIndicator color={colors.dark09} />
          }
          <Text dark09 text-14 marginL-10>{text}</Text>
        </View>}
      </View>
    )
  }
}
