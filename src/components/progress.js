import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native'

const styles = StyleSheet.create({
  range: {
    backgroundColor: '#3385ff',
    height: 2,
    overflow: 'hidden'
  },
  wrap: {
    backgroundColor: '#bbb',
    height: 2
  }
})

export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }
  start = () => {
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
  end = () => {
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
    const rangeWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.width, 1 * this.props.width]
    })

    return (
      <Animated.View style={[styles.wrap, this.props.style, { opacity: this.state.opacity }, { width: this.props.width }]}>
        <Animated.View style={[styles.range, { width: rangeWidth }]} />
      </Animated.View>
    )
  }
}
