import React, { Component } from 'react'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { StyleSheet, Dimensions } from 'react-native'
import { View, Button, Image } from '../../react-native-ui-lib'
import { width, height } from '../utils'
import { colors } from '../theme'
import * as Animatable from 'react-native-animatable'
export default class SplashSwiper extends Component {
  static defaultProps = {
    data: [
      {
        img: require('../assets/splash/1.png'),
        text: require('../assets/splash/text01.png')
      }, {
        img: require('../assets/splash/2.png'),
        text: require('../assets/splash/text02.png')
      }, {
        img: require('../assets/splash/3.png'),
        text: require('../assets/splash/text03.png')
      }, {
        img: require('../assets/splash/4.png'),
        text: require('../assets/splash/text04.png')
      }, {
        img: require('../assets/splash/5.png'),
        text: require('../assets/splash/text05.png')
      }
    ]
  }
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  renderCarouselChild = ({ item, index }, parallaxProps) => {
    const scale = 541 / 1042
    const { activeIndex } = this.state
    return (
      <View key={index} style={{ backgroundColor: colors.light, height: height, width: '100%' }}>
        <Animatable.View style={[styles.textWrap, index === 4 && { paddingTop: 150 }]} animation={activeIndex === index ? 'fadeInDown' : 'fadeOut'} duration={500}>
          <Image source={item.text} style={{ width: width - 30, height: (width - 30) * scale, marginLeft: 15 }} />
          {index === 4 && <View style={{ position: 'absolute', left: (width - 200) / 2, width: 200, bottom: 200, zIndex: 100 }}>
            <Button bg-calm label='开始体验' onPress={this.close} />
          </View>}
        </Animatable.View>
        <ParallaxImage
          source={item.img}
          containerStyle={{ height: '100%', width: '100%' }}
          // style={{ height: height, width: width }}
          resizeMode='contain'
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View >
    )
  }
  pagination = () => {
    const { data } = this.props
    const { activeIndex } = this.state
    return (
      <Pagination
        dotsLength={data.length}
        containerStyle={{ backgroundColor: 'transparent', position: 'absolute', 'width': '100%', bottom: 0, paddingVertical: 15 }}
        activeDotIndex={activeIndex}
        dotContainerStyle={{ marginHorizontal: 5 }}
        dotStyle={{
          width: 8,
          height: 8,
          marginHorizontal: 2,
          borderRadius: 4,
          backgroundColor: colors.dark
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          marginHorizontal: 2,
          borderRadius: 4,
          backgroundColor: colors.dark
          // Define styles for inactive dots here
        }}
        inactiveDotScale={1}
      />
    )
  }
  close = () => {
    const { close } = this.props
    this.setState({
      animationConfig: {
        animation: 'fadeOut',
        onAnimationEnd: () => {
          close && close()
        }
      }
    })
  }
  render () {
    const { data } = this.props
    const { animationConfig } = this.state
    const itemWidth = 777 * height / 1080
    const marginLeft = (itemWidth - width) / 2
    return (
      <Animatable.View style={styles.splash} {...animationConfig}>
        <Carousel
          data={data}
          hasParallaxImages
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeAnimationOptions={{ useNativeDriver: false }}
          contentContainerCustomStyle={{ marginLeft: -marginLeft }}
          renderItem={this.renderCarouselChild}
          sliderWidth={width}
          itemWidth={itemWidth}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
        {this.pagination()}
      </Animatable.View>
    )
  }
  componentDidMount () {
    // alert(height + ',' + 777 * height / 1080)
  }
}
const styles = StyleSheet.create({
  textWrap: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -width / 2,
    overflow: 'hidden',
    width: width,
    paddingTop: 80,
    zIndex: 1,
    height: height
  },
  splashButton: {
    position: 'absolute'
  },
  splash: {
    position: 'absolute',
    backgroundColor: colors.light,
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 101
  }
})
