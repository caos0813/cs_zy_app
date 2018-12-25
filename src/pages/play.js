import React, { Component } from 'react'
import { StyleSheet, findNodeHandle, DeviceEventEmitter, ScrollView, Modal } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { width, statusBarHeight, transferTime, navigator, transferPlayerTime } from '../utils'
import { Header, NewsFooter } from '../components'
import { Player } from '../../react-native-root-ui'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
@observer class Play extends Component {
  @observable duration = '00:00'
  @observable position = '00:00'
  @observable currentTime = 0
  @observable paused = true
  @observable data = {
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
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
  play = () => {
    Player.player && Player.pause()
  }
  render () {
    const { data, duration, position, paused } = this
    return (
      <View flex useSafeArea>
        <ScrollView style={styles.scroll}>
          <View style={styles.imageWrap} centerH>
            <Header
              containerStyle={styles.header}
              showLeft={false}
              showRight={false}
              titleContainer={<TouchableOpacity activeOpacity={0.6} onPress={this.goBack}>
                <Image assetName='playerArrowDown' tintColor={colors.light} />
              </TouchableOpacity>}
            />
            <Image
              style={styles.imageBlur}
              ref={(img) => { this.backgroundImage = img }}
              source={{ uri: data.picture }}
              onLoadEnd={this.imageLoaded}
            />
            {this.state.viewRef && data.picture &&
              <BlurView
                style={styles.blur}
                viewRef={this.state.viewRef}
                blurAmount={100}
                overlayColor='transparent'
                downsampleFactor={10}
              />
            }
            <Image
              style={styles.image}
              source={{ uri: data.picture }}
            />
            <View style={[styles.progress]}>
              <Text light text-9>{position}/{duration}</Text>
            </View>
          </View>
          <View center paddingT-50 paddingB-24>
            <Text text-24 dark marginB-20>{data.title}</Text>
            <Text text-14 dark06 dark marginB-20>{transferTime(data.releaseTime)}</Text>
            <TouchableOpacity onPress={this.play}>
              <Image assetName={paused ? 'playerPlayBig' : 'playerPausedBig'} tintColor={colors.dark} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NewsFooter />
      </View>
    )
  }
  goBack=() => {
    navigator.goBack()
  }
  componentWillUnmount () {
    Player.player && Player.setStatus(true)
    this.playerEvent.remove()
  }
  componentDidMount () {
    const { setValue, data } = this
    Player.player && Player.setStatus(false)
    this.playerEvent = DeviceEventEmitter.addListener('playerEvent', e => {
      console.log(e)
      const { duration, currentTime, others, paused } = e
      setValue('paused', paused)
      if (_.isEmpty(data)) {
        setValue('data', others)
      }
      setValue('position', transferPlayerTime(currentTime))
      setValue('duration', transferPlayerTime(duration))
    })
  }
}
export default Play
const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    bottom: -6,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 12
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
  blur: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0
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
    opacity: 0
  }
})
