import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { View, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { imageResize, width } from '../utils'
import { colors } from '../theme'
export default class HomeBanner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  bannerPress = (item) => {
    const { itemPress } = this.props
    itemPress && itemPress(item)
  }
  renderCarouselChild = (obj, index) => {
    const { item } = obj
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.bannerPress(item)} style={{ width: width - 20, paddingHorizontal: 2.5 }}>
        <Image source={{ uri: imageResize(item.image, 500) }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 8 }} />
      </TouchableOpacity>
    )
  }
  pagination = () => {
    const { data } = this.props
    const { activeIndex } = this.state
    return (
      <Pagination
        dotsLength={data.length}
        containerStyle={{ backgroundColor: 'transparent', position: 'absolute', 'width': '100%', bottom: 0, paddingVertical: 15 }}
        dotContainerStyle={{ marginHorizontal: 5 }}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 25,
          height: 5,
          borderRadius: 2.5,
          elevation: 3,
          backgroundColor: colors.light
        }}
        inactiveDotStyle={{
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: colors.light
          // Define styles for inactive dots here
        }}
        inactiveDotScale={1}
      />
    )
  }
  render () {
    const { data } = this.props
    return (
      <View>
        <Carousel
          data={data}
          useScrollView
          inactiveSlideScale={1}
          renderItem={this.renderCarouselChild}
          slideStyle={{ height: 150 }}
          sliderWidth={width}
          itemWidth={width - 20}
          autoplay
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
        {this.pagination()}
      </View>
    )
  }
}
