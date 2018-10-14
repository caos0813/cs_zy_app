import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  range: {
    backgroundColor: '#3b5998',
    height: 2,
    overflow: 'hidden'
  },
  wrap: {
    backgroundColor: '#bbbbbb',
    height: 2
  }
})

export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0)
    }
  }
  start = () => {
    this.state.progress.setValue(0)
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
    Animated.timing(
      this.state.progress,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.in
      }
    ).start()
  }
  render () {
    const rangeWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width]
    })

    return (
      <View style={[styles.wrap, this.props.style]}>
        <Animated.View style={[styles.range, { width: rangeWidth }]} />
      </View>
    )
  }
}
