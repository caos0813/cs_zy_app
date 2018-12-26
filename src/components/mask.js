import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
export default class Progress extends Component {
  constructor (props) {
    super(props)
  }
  state={
    show: false,
    animationConfig: {}
  }
  show = () => {
    this.setState({
      show: true,
      animationConfig: {
        animation: 'fadeIn',
        duration: 150
      }
    })
  }
  status () {
    return this.state.show
  }
  hide = () => {
    this.setState({
      animationConfig: {
        animation: 'fadeOut',
        duration: 150,
        onAnimationEnd: () => {
          this.setState({
            show: false
          })
        }
      }
    })
  }
  render () {
    const { animationConfig, show } = this.state
    return show ? <Animatable.View style={[styles.wrap]} {...animationConfig} /> : null
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 1001
  }
})
