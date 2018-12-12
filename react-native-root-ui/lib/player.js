import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import Video from 'react-native-video'
import * as Animatable from 'react-native-animatable'
export default class Player extends Component {
  static player = null
  static close () {
    if (this.player instanceof RootSiblings) {
      this.player.destroy()
    } else {
      console.warn(`player.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof player}\` instead.`)
    }
  }
  static pause () {
    const { source, paused } = this.playerRef.props
    this.play(source.uri, {
      paused: !paused
    })
  }
  static onEnd () {
    // this.playerRef.seek(0)
  }
  static play (url, obj = {}) {
    this.playerUrl = url
    const options = {
      playInBackground: true,
      ...obj
    }
    if (this.player instanceof RootSiblings) {
      this.player.update(<Animatable.View style={styles.wrap} row center animation='slideInUp' duration={300}>
        <Video
          ref={(ref) => { this.playerRef = ref }}
          source={{ uri: url }}
          {...options}
          onEnd={() => this.onEnd()}
        />
        <Button label='关闭' onPress={() => this.close()} />
        <Button label='暂停' onPress={() => this.pause()} />
      </Animatable.View>)
    } else {
      this.player = new RootSiblings(<Animatable.View style={styles.wrap} row center animation='slideInUp' duration={300}>
        <Video
          ref={(ref) => { this.playerRef = ref }}
          source={{ uri: url }}
          {...options}
          onEnd={() => this.onEnd()}
        />
        <Button label='关闭' onPress={() => this.close()} />
        <Button label='暂停' onPress={() => this.pause()} />
      </Animatable.View>)
    }
  }
  render () {
    return null
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    position: 'absolute',
    height: 150,
    left: 0,
    bottom: 0,
    zIndex: 1001
  },
  player: {
    height: '100%'
  }
})
