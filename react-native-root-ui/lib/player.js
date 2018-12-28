import React, { Component } from 'react'
import { StyleSheet, DeviceEventEmitter } from 'react-native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import Video from 'react-native-video'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../src/theme'
import { navigator, transferPlayerTime } from '../../src/utils'
class PlayerContainer extends Component {
  static propTypes = {
    /* {
      config={
        id,
        title,
        url,
        image,
        currentTime,
        others
      }
    } */
    /*
      e={
        id,
        title,
        url,
        image,
        currentTime,
        paused,
        duration,
        others
      }
    */
    config: PropTypes.object,
    close: PropTypes.func,
    pause: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      duration: 0,
      position: '00:00',
      time: '00:00',
      audioEnd: false,
      opacity: 1
    }
  }
  audioLoad = (e) => {
    const { duration } = e
    this.setState({
      duration: duration,
      time: transferPlayerTime(duration),
      currentTime: 0,
      audioEnd: false
    })
  }
  onEnd = () => {
    this.setState({
      audioEnd: true
    })
    const { config, currentTime } = this.props
    const { duration } = this.state
    DeviceEventEmitter.emit('playerEvent', {
      ...config,
      paused: true,
      currentTime,
      duration
    })
  }
  setStatus=(flag) => {
    this.setState({
      opacity: flag ? 1 : 0
    })
  }
  onProgress = (e) => {
    const { currentTime } = e
    const { duration } = this.state
    this.setState({
      position: transferPlayerTime(currentTime),
      currentTime
    })
    const { config } = this.props
    DeviceEventEmitter.emit('playerEvent', {
      ...config,
      paused: false,
      currentTime,
      duration
    })
  }
  updatePlayer = () => {
    this.setState({
      audioEnd: false
    })
    this.playerRef.seek(0)
  }
  toMiniPlayer=() => {
    const { id } = this.props.config
    navigator.push('Play', { articleId: id })
  }
  render () {
    const { title, url, image, paused } = this.props.config
    const { pause, close } = this.props
    const { time, audioEnd, position, opacity } = this.state
    return (
      <Animatable.View style={[styles.wrap, { opacity: opacity }]} row center animation='slideInUp' duration={300}>
        <View style={styles.player} row>
          <View row centerV>
            <Video
              ref={(ref) => { this.playerRef = ref }}
              source={{ uri: url }}
              playInBackground
              onLoad={this.audioLoad}
              onEnd={this.onEnd}
              paused={paused}
              onProgress={this.onProgress}
              progressUpdateInterval={1000}
            />
            {(paused || audioEnd) && <TouchableOpacity activeOpacity={0.6} onPress={close} style={{ marginRight: 9 }}><Image assetName='playerClose' /></TouchableOpacity>}
          </View>
          <View flex row centerV paddingR-9>
            <Image source={{ uri: image }} style={styles.image} />
            <View flex paddingL-5>
              <Text text-14 light numberOfLines={1}>{title}</Text>
              <Text text-12 grey>{position}/{time}</Text>
            </View>
          </View>
          <View style={styles.btnWrap} >
            {!audioEnd && !paused &&
            <TouchableOpacity row activeOpacity={0.6} onPress={this.toMiniPlayer}><Image assetName='playerArrowUp' tintColor={colors.light} /></TouchableOpacity>
            }
            <TouchableOpacity style={{ marginLeft: 10 }} row activeOpacity={0.6} onPress={pause}>{
              (paused || audioEnd) ? <Image assetName='playerPlay' /> : <Image assetName='playerPause' />
            }</TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    )
  }
  componentDidUpdate () {
    // console.log('player componentDidUpdate')
  }
  componentWillReceiveProps () {
    // console.log('player componentWillReceiveProps')
  }
  componentDidMount () {
    // console.log('player componentDidMount')
    const { currentTime } = this.props.config
    this.playerRef.seek(currentTime)
  }
}
export default class Player extends Component {
  static player = null
  static config={}
  static close () {
    if (this.player instanceof RootSiblings) {
      this.player.destroy()
      this.config = {}
      this.player = null
    } else {
      console.warn(`player.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof player}\` instead.`)
    }
    DeviceEventEmitter.emit('playerEvent', {
      ...this.config,
      paused: true
    })
  }
  static pause () {
    const { config } = this.playerContainer.props
    const { state } = this.playerContainer
    config.paused = !config.paused
    this.play(config, state.audioEnd)
  }
  static getPlayerConfig () {
    let config = this.config
    if (this.playerContainer) {
      const { state } = this.playerContainer
      config.currentTime = state.currentTime
    }
    return config
  }
  static setStatus (flag) {
    if (this.player instanceof RootSiblings) {
      this.playerContainer.setStatus(flag)
    }
  }
  static play (config = {}, audioEnd = false) {
    if (this.player instanceof RootSiblings) {
      if (audioEnd && this.playerContainer) {
        /* 播放完成重置播放状态 */
        config.paused = false
        this.playerContainer.updatePlayer()
      }
      this.player.update(
        <PlayerContainer
          ref={(ref) => { this.playerContainer = ref }}
          config={config}
          pause={() => this.pause()}
          close={() => this.close()} />)
      const { duration, currentTime } = this.playerContainer.state
      DeviceEventEmitter.emit('playerEvent', {
        ...config,
        duration,
        currentTime
      })
    } else {
      config.paused = false
      this.player = new RootSiblings(<PlayerContainer
        ref={(ref) => { this.playerContainer = ref }}
        config={config}
        pause={() => this.pause()}
        close={() => this.close()}
      />)
      DeviceEventEmitter.emit('playerEvent', config)
    }
    this.config = config
  }
  render () {
    return null
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
    width: '100%',
    position: 'absolute',
    height: 50,
    left: 0,
    bottom: 70
  },
  player: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.dark07,
    borderRadius: 10,
    height: '100%'
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 3
  }
})
