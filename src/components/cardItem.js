import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity, View, Text } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { imageResize } from '../utils'
export default class CardItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    imageStyle: PropTypes.object,
    onPress: PropTypes.func
  }
  static defaultProps = {
    fileType: 0
  }
  render () {
    const { imageSource, title, desc, children, imageStyle, fileType, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.wrap}>
        <View style={[styles.imgWap, imageStyle]}>
          <Image source={imageSource} style={[styles.image]} />
          {fileType !== 0 && <Image assetName='play' style={styles.playButton} tinkColor={colors.light} />}
          {/* <BlurView
            style={styles.blur}
            viewRef={this.state.viewRef}
            blurType='light'
            blurAmount={1}
            overlayColor='transparent'
            downsampleFactor={1}
            blurRadius={2}
          /> */}
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
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0
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
