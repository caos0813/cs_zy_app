import React, { Component } from 'react'
import { View, Text } from '../../react-native-ui-lib/src'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'

export default class test extends Component {
  render () {
    return (
      <ParallaxScroll
        renderHeader={({ animatedValue }) => <View animatedValue={animatedValue} ><Text>header</Text></View>}
        headerHeight={50}
        isHeaderFixed={false}
        parallaxHeight={250}
        renderParallaxBackground={({ animatedValue }) => <View animatedValue={animatedValue} ><Text>renderParallaxBackground</Text></View>}
        renderParallaxForeground={({ animatedValue }) => <View animatedValue={animatedValue} ><Text>renderParallaxForeground</Text></View>}
        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}
      >
        <View style={{ height: 500 }}>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>
        <View>
          <Text>测试</Text>
        </View>

      </ParallaxScroll>
    )
  }
}
