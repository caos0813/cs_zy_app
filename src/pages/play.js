import React, { Component } from 'react'
import { StyleSheet, findNodeHandle, DeviceEventEmitter, StatusBar, ScrollView } from 'react-native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { width, statusBarHeight, ratio } from '../utils'
import { Header } from '../components'
class Play extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor (props) {
    super(props)
    this.state = { viewRef: null }
  }
  imageLoaded= () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  close=() => {
    alert(1)
  }
  render () {
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        <ScrollView style={styles.scroll}>
          <View style={styles.imageWrap} centerH>
            <Header
              containerStyle={styles.header}
              showLeft
              showRight
              titleContainer={<TouchableOpacity activeOpacity={0.6} onPress={this.close}><Image assetName='playerArrowDown' /></TouchableOpacity>}
            />
            <Image
              style={styles.imageBlur}
              ref={(img) => { this.backgroundImage = img }}
              source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }}
              onLoadEnd={this.imageLoaded}
            />
            {this.state.viewRef &&
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType='light'
              blurAmount={10}
            />
            }
            <Image
              style={styles.image}
              source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }}
            />
            <View style={styles.progress}>
              <Text light text-9>1:11/3:00</Text>
            </View>
          </View>
          <View center paddingT-50 paddingB-24>
            <Text text-24 dark marginB-20>高中生如何做好生涯规划？</Text>
            <Text text-14 dark06 dark marginB-20>知涯搜·30分钟前</Text>
            <TouchableOpacity>
              <Image assetName='playerPlayBig' tintColor={colors.dark} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer} >
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='detail' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='attention' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='comment' />
            <Text text-14 dark06 marginL-5>66</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='share' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  componentDidMount () {
    DeviceEventEmitter.addListener('BlurEvent', (e) => {
      console.log(e)
      // handle event.
    })
  }
}
export default Play
const styles = StyleSheet.create({
  footer: {
    borderTopColor: colors.grey,
    borderTopWidth: 1 / ratio,
    flexDirection: 'row',
    height: 50
  },
  progress: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    position: 'absolute',
    left: 0,
    bottom: -6,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5
  },
  footerCeil: {
    height: '100%',
    flexDirection: 'row',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    zIndex: 10
  },
  absolute: {
    position: 'absolute'
  },
  image: {
    position: 'absolute',
    width: 281,
    height: 281,
    bottom: 47,
    borderRadius: 10
  },
  imageBlur: {
    width: width,
    height: 425 + statusBarHeight,
    borderRadius: 10,
    transform: [{ scale: 0.75 }]
  }
})
