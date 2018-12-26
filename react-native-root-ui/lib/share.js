import React, { Component } from 'react'
import RootSiblings from 'react-native-root-siblings'
import { Share } from '../../src/components'
import Mask from './mask'
import * as Animatable from 'react-native-animatable'
export default class Loading extends Component {
  static shareDom = null
  static show (config) {
    /*
      congig={
        thumbImage: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        webpageUrl: PropTypes.string,
        shareCallback: PropTypes.func
      }
    */
    Mask.show()
    const ShareComponent = Animatable.createAnimatableComponent(Share)
    this.shareDom = new RootSiblings(<ShareComponent animation='slideInUp' duration={300} close={() => this.close()} />)
  }
  static close () {
    Mask.hide()
    if (this.shareDom instanceof RootSiblings) {
      this.shareDom.destroy()
      this.shareDom = null
    }
  }
  render () {
    return (
      null
    )
  }
}
