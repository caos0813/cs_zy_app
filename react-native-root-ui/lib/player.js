import React, { Component } from 'react'
import { StyleSheet, DeviceEventEmitter } from 'react-native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import Video from 'react-native-video'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../src/theme'
class PlayerContainer extends Component {
  static propTypes = {
    /* {
      config={
        id,
        title,
        url,
        image,
        currentTime
      }
    } */
    config: PropTypes.object,
    videoConfig: PropTypes.object,
    close: PropTypes.func,
    pause: PropTypes.func
  }
  state = {
    duration: '00:00',
    position: '00:00',
    audioEnd: false
  }
  audioLoad = (e) => {
    const { duration } = e
    let m = Math.floor(duration / 60).toString()
    let s = Math.floor(duration % 60).toString()
    m = (m.length === 1) ? `0${m}` : m
    s = (s.length === 1) ? `0${s}` : s
    this.setState({
      duration: `${m}:${s}`,
      currentTime: 0,
      audioEnd: false
    })
  }
  onEnd = () => {
    this.setState({
      audioEnd: true
    })
    const { config } = this.props
    DeviceEventEmitter.emit('playerEvent', {
      ...config,
      paused: true
    })
  }
  onProgress = (e) => {
    const { currentTime } = e
    let m = Math.floor(currentTime / 60).toString()
    let s = Math.floor(currentTime % 60).toString()
    m = (m.length === 1) ? `0${m}` : m
    s = (s.length === 1) ? `0${s}` : s
    this.setState({
      position: `${m}:${s}`,
      currentTime
    })
    const { config, videoConfig } = this.props
    console.log('onProgress')
    DeviceEventEmitter.emit('playerEvent', {
      ...config,
      paused: !!videoConfig.paused,
      currentTime
    })
  }
  updatePlayer = () => {
    this.setState({
      audioEnd: false
    })
  }
  render () {
    const { config, videoConfig, close, pause } = this.props
    const { duration, audioEnd, position } = this.state
    return (
      <Animatable.View style={styles.wrap} row center animation='slideInUp' duration={300}>
        <View style={styles.player} row>
          <View row centerV>
            <Video
              ref={(ref) => { this.playerRef = ref }}
              source={{ uri: config.url }}
              {...videoConfig}
              onLoad={this.audioLoad}
              onEnd={this.onEnd}
              onProgress={this.onProgress}
              progressUpdateInterval={1000}
            />
            {(videoConfig.paused || audioEnd) && <TouchableOpacity activeOpacity={0.6} onPress={close} style={{ marginRight: 9 }}><Image assetName='playerClose' /></TouchableOpacity>}
          </View>
          <View flex row centerV paddingR-9>
            <Image source={{ uri: config.image }} style={styles.image} />
            <View flex paddingL-5>
              <Text text-14 light numberOfLines={1}>{config.title}</Text>
              <Text text-12 grey>{position}/{duration}</Text>
            </View>
          </View>
          <View style={styles.btnWrap} >
            <TouchableOpacity row activeOpacity={0.6} onPress={pause}><Image assetName='playerArrowUp' /></TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }} row activeOpacity={0.6} onPress={pause}>{
              (videoConfig.paused || audioEnd) ? <Image assetName='playerPlay' /> : <Image assetName='playerPause' />
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
    console.log('close')
    DeviceEventEmitter.emit('playerEvent', {
      paused: true,
      ...this.config
    })
  }
  static pause () {
    const { config, videoConfig } = this.playerContainer.props
    const { state } = this.playerContainer
    videoConfig.paused = !videoConfig.paused
    this.play(config, videoConfig, state.audioEnd)
  }
  static getPlayerConfig () {
    let config = this.config
    if (this.playerContainer) {
      const { state } = this.playerContainer
      config.currentTime = state.currentTime
    }
    return config
  }
  static play (config = {}, videoConfig = {}, audioEnd = false) {
    videoConfig.playInBackground = true
    if (this.player instanceof RootSiblings) {
      if (audioEnd && this.playerContainer) {
        const { playerRef } = this.playerContainer
        /* 播放完成重置播放状态 */
        videoConfig.paused = false
        this.playerContainer.updatePlayer()
        playerRef.seek(0)
      }
      this.player.update(
        <PlayerContainer
          ref={(ref) => { this.playerContainer = ref }}
          config={config}
          videoConfig={videoConfig}
          pause={() => this.pause()}
          close={() => this.close()} />)
    } else {
      this.player = new RootSiblings(<PlayerContainer
        ref={(ref) => { this.playerContainer = ref }}
        config={config}
        videoConfig={videoConfig}
        pause={() => this.pause()}
        close={() => this.close()} />)
    }
    this.config = config
    DeviceEventEmitter.emit('playerEvent', {
      ...this.config,
      paused: videoConfig.paused
    })
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
    bottom: 60
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
