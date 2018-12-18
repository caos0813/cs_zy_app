import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { StyleSheet, findNodeHandle } from 'react-native'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = { viewRef: null }
  }
  static defaultProps = {
    width: '46%',
    wapHeight: 85,
    bottomBar: false
    // viewRef: null
  }
  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  render () {
    const { lists, containerStyle } = this.props
    return (
      <View paddingH-15 row style={[{ flexWrap: 'wrap' }, containerStyle]}>
        {lists.map((item, index) => (
          <TouchableOpacity style={[{ width: this.props.width, marginBottom: 15, marginRight: '4%' }]} activeOpacity={0.6}>
            <View style={[styles.imgWap, { height: this.props.wapHeight }]}>
              <Image style={styles.scrollImg} assetName={item.img} ref={(img) => { this.backgroundImage = img }} onLoadEnd={this.imageLoaded} />
              {/* <View>
                <Image ref={(img) => { this.backgroundImage = img }} onLoadEnd={this.imageLoaded} style={styles.falseImg} assetName={item.img} />
                <Text style={styles.playButton} />
              </View> */}
              <Text style={styles.playButton} />
              <Text style={styles.scrollTime} text-12 light>3:32</Text>
              <BlurView
                style={styles.blur}
                viewRef={this.state.viewRef}
                blurType='light'
                blurAmount={1}
                overlayColor='transparent'
                downsampleFactor={1}
                blurRadius={2}
              />
            </View>
            <View style={styles.description}>
              <Text numberOfLines={1} style={{ lineHeight: 22 }} text-16 dark marginB-5>{item.title}</Text>
              <Text style={{ lineHeight: 17 }} numberOfLines={2} text-12 gray>{item.text}</Text>
            </View>
            {this.props.bottomBar && <View marginT-10 row style={{ justifyContent: 'space-between' }}>
              <View row>
                <View row marginR-10>
                  <Image assetName='vip' />
                  <Text style={{ marginLeft: 5 }} gray>23</Text>
                </View>
                <View row>
                  <Image assetName='vip' />
                  <Text style={{ marginLeft: 5 }} gray>23</Text>
                </View>
              </View>
              <Text gray>一天前</Text>
            </View>}
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgWap: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
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
  description: {
    width: '95%'
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
    borderStyle: 'solid',
    borderWidth: 8,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: colors.light,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent'
  }
})
