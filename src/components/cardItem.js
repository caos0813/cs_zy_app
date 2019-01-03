import React, { Component } from 'react'
import { StyleSheet, findNodeHandle } from 'react-native'
import { Image, TouchableOpacity, View, Text } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import { imageResize } from '../utils'
import { configure, observable, action } from 'mobx'
import { PlayBtn } from '../components'
export default class CardItem extends Component {
  @observable paused = true
  constructor (props) {
    super(props)
    this.state = {
      viewRef: null
    }
  }
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    imageStyle: PropTypes.object,
    onPress: PropTypes.func
  }
  static defaultProps = {
    fileType: 0
  }
  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  render () {
    const { imageSource, title, desc, children, imageStyle, fileType, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.wrap}>
        <View style={[styles.imgWap, imageStyle]}>
          <Image ref={(img) => { this.backgroundImage = img }} source={imageSource} style={[styles.image]} onLoadEnd={this.imageLoaded} />
          {fileType !== 0 && <PlayBtn
            size={30}
            paused={this.paused}
            activeOpacity={1}
            onPress={onPress}
            viewRef={this.state.viewRef}
          />}
        </View>
        <Text text-16 dark numberOfLines={1} marginV-5>{title}</Text>
        <Text text-12 dark06 numberOfLines={2}>{desc}</Text>
        {children && <View>{children}</View>}
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    // alignItems: 'center'
  },
  scrollImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  scrollTime: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    textShadowColor: colors.black01,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, hegith: 4 }
  },
  blur: {
    width: '20%',
    height: '20%'
  },
  // falseImg: {
  //   position: 'absolute',
  //   width: 32,
  //   height: 32
  //   // borderRadius: 50
  // },
  imgWap: {
    width: '100%',
    height: 85,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8
  }
})
