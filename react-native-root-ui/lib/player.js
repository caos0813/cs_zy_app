import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Image, TouchableOpacity, Text, Constants } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import Video from 'react-native-video'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../src/theme'
import { navigator, transferPlayerTime } from '../../src/utils'
import { observer } from 'mobx-react/native'
import playerStore from '../../src/store/playerStore'
@observer class PlayerContainer extends Component {
  static propTypes = {
    config: PropTypes.object,
    close: PropTypes.func,
    pause: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.setValue = props.playerStore.setValue
  }
  audioLoad = (e) => {
    console.log(e)
    const { duration } = e
    this.setValue({
      duration: transferPlayerTime(duration),
      audioEnd: false
    })
  }
  onEnd = () => {
    this.setValue({
      paused: true,
      audioEnd: true
    })
  }
  onProgress = (e) => {
    const { currentTime } = e
    this.setValue({
      position: transferPlayerTime(currentTime)
    })
  }
  updatePlayer = () => {
    this.refs.playerRef.seek(0)
    this.setValue({
      audioEnd: false
    })
    setTimeout(() => {
      this.setValue({
        paused: false
      })
    }, 1)
  }
  toMiniPlayer=() => {
    const { id } = this.props.config
    navigator.navigate('Play', { articleId: id })
  }

  render () {
    const { title, url, image } = this.props.config
    const { pause, close } = this.props
    const { duration, audioEnd, position, paused } = this.props.playerStore
    return (
      <Animatable.View style={[styles.wrap]} row center animation='slideInUp' duration={300}>
        <View style={styles.player} row>
          <View row centerV>
            <Video
              ref='playerRef'
              source={{ uri: url }}
              playInBackground
              onLoad={this.audioLoad}
              onEnd={this.onEnd}
              paused={paused}
              onProgress={this.onProgress}
              progressUpdateInterval={200}
            />
            {(paused || audioEnd) && <TouchableOpacity activeOpacity={0.6} onPress={close} style={{ marginRight: 9 }}><Image assetName='playerClose' /></TouchableOpacity>}
          </View>
          <View flex row centerV paddingR-9>
            <Image source={{ uri: image }} style={styles.image} />
            <View flex paddingL-5>
              <Text text-14 light numberOfLines={1}>{title}</Text>
              <Text text-12 grey>{position}/{duration}</Text>
            </View>
          </View>
          <View style={styles.btnWrap} >
            {!audioEnd && !paused &&
            <TouchableOpacity row activeOpacity={0.6} onPress={this.toMiniPlayer}><Image assetName='playerArrowUp' tintColor={colors.light} /></TouchableOpacity>
            }
            <TouchableOpacity style={{ marginLeft: 10 }} row activeOpacity={0.6} onPress={pause}>{
              (paused) ? <Image assetName='playerPlay' /> : <Image assetName='playerPause' tintColor={colors.light} />
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
  }
}
export default class Player extends Component {
  static player = null
  static config={}
  static setValue=playerStore.setValue
  static close () {
    if (this.player instanceof RootSiblings) {
      this.player.destroy()
      this.config = {}
      this.player = null
      playerStore.resetStore()
    } else {
      console.warn(`player.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof player}\` instead.`)
    }
  }
  static pause () {
    const { paused, audioEnd } = playerStore
    if (audioEnd) {
      this.playerContainer.updatePlayer()
    } else {
      this.setValue({
        paused: !paused
      })
    }
  }

  static play (config) {
    /*
      config={
        id: this.data.id,
        url: this.data.videoFile,
        title: this.data.title,
        image: imageResize(this.data.picture, 200),
        currentTime: 55,
        show
      }

    */
    if (this.player instanceof RootSiblings) {
      const { audioEnd, id } = playerStore
      if (audioEnd && id === config.id) {
        /* 播放完成重置播放状态 */
        this.playerContainer.updatePlayer()
      } else {
        this.player.update(
          <PlayerContainer
            ref={(ref) => { this.playerContainer = ref }}
            config={config}
            playerStore={playerStore}
            pause={() => this.pause()}
            close={() => this.close()} />)
      }
    } else {
      playerStore.resetStore()
      this.setValue({
        paused: false
      })
      this.player = new RootSiblings(<PlayerContainer
        ref={(ref) => { this.playerContainer = ref }}
        config={config}
        pause={() => this.pause()}
        close={() => this.close()}
        playerStore={playerStore}
      />)
    }
    this.setValue({
      id: config.id
    })
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
    bottom: 60 + (Constants.isIphoneX ? 34 : 0)
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
