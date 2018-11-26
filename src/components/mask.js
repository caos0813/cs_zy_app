import React, { Component } from 'react'
import {
  StyleSheet,
  Animated,
  View
} from 'react-native'
import { width, height } from '../utils'
export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // show: false,
      opacity: new Animated.Value(0)
    }
  }
  show = () => {
    this.state.opacity.setValue(0)
    this.setState({
      show: true
    })
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 200
      }
    ).start()
  }
  status () {
    return this.state.show
  }
  hide = () => {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 200
      }
    ).start(() => {
      this.setState({
        show: false
      })
    })
  }
  render () {
    return (
      <View>
        {this.state.show ? <Animated.View style={[styles.wrap, { opacity: this.state.opacity }]}></Animated.View> : null}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: height,
    width: width,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100
  }
})
