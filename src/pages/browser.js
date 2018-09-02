import React, { Component } from 'react'
import { WebView } from 'react-native'
export default class Browser extends Component {
  render () {
    return (
      <WebView
        source={{ uri: 'http://hotipay.luhesj.com/www/#/forget' }}
      />
    )
  }
}
