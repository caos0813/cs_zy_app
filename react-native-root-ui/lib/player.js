import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Button } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import Video from 'react-native-video'
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
      this.player.update(<View style={styles.wrap} row center>
        <Video
          ref={(ref) => { this.playerRef = ref }}
          source={{ uri: url }}
          {...options}
          onEnd={() => this.onEnd()}
        />
        <Button label='关闭' onPress={() => this.close()} />
        <Button label='暂停' onPress={() => this.pause()} />
      </View>)
    } else {
      this.player = new RootSiblings(<View style={styles.wrap} row center>
        <Video
          ref={(ref) => { this.playerRef = ref }}
          source={{ uri: url }}
          {...options}
          onEnd={() => this.onEnd()}
        />
        <Button label='关闭' onPress={() => this.close()} />
        <Button label='暂停' onPress={() => this.pause()} />
      </View>)
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
