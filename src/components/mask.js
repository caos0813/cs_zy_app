import React, { Component } from 'react'
import {
  StyleSheet,
  Animated,
  Easing
} from 'react-native'
import { width, height } from '../utils'
export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }
  show = () => {
    this.state.progress.setValue(0)
    this.state.opacity.setValue(1)
    Animated.timing(
      this.state.progress,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.in
      }
    ).start()
  }
  hide = () => {
    Animated.sequence([
      Animated.timing(
        this.state.progress,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.in
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 800
        }
      )
    ]).start()
  }
  render () {
    return (
      <Animated.View style={[styles.wrap, this.props.style]}>
      </Animated.View>
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
    zIndex: 1001
  }
})
