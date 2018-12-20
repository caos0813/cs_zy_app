import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Image, TouchableOpacity, Text, View } from '../../react-native-ui-lib'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
export default class CardItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    bottomBar: PropTypes.string,
    releaseTime: PropTypes.string,
    priseNumber: PropTypes.number,
    commentNum: PropTypes.number,
    fileType: PropTypes.number
  }
  static defaultProps = {
    bottomBar: 'false',
    priseNumber: 0,
    commentNum: 0
  }
  render () {
    const { imageSource, title, desc, releaseTime, bottomBar, priseNumber, commentNum, fileType } = this.props
    return (
      // <TouchableOpacity activeOpacity={0.6} style={styles.wrap}>
      //   <Image source={imageSource} style={styles.image} />
      //   <Text text-16 dark numberOfLines={1} marginV-5>{title}</Text>
      //   <Text text-12 dark06 numberOfLines={2}>{desc}</Text>
      // </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.wrap}>
        <View>
          <Image style={styles.image} source={imageSource} />
          {fileType !== 0 && <Text style={styles.playButton} />}
          {/* <Text style={styles.scrollTime} text-12 light>3:32</Text> */}
          {/* {this.state.viewRef &&
            <BlurView
              style={styles.blur}
              viewRef={this.state.viewRef}
              blurType='light'
              blurAmount={1}
              overlayColor='transparent'
              downsampleFactor={1}
              blurRadius={2}
            />
          } */}
        </View>
        <Text text-16 dark numberOfLines={1} marginV-5>{title}</Text>
        <Text text-12 dark06 numberOfLines={2}>{desc}</Text>
        {bottomBar === 'true' && <View marginT-10 row style={{ justifyContent: 'space-between' }}>
          <View row>
            <View row marginR-10>
              <Image assetName='vip' />
              <Text style={{ marginLeft: 5 }} gray>{priseNumber}</Text>
            </View>
            <View row>
              <Image assetName='vip' />
              <Text style={{ marginLeft: 5 }} gray>{commentNum}</Text>
            </View>
          </View>
          <Text gray>{releaseTime}</Text>
        </View>}
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 85,
    borderRadius: 8
  },
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
  playButton: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: '50%',
    left: '50%',
    borderStyle: 'solid',
    borderWidth: 8,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: colors.light,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent'
  }
})
