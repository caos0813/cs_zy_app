import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
export default class Loading extends Component {
  status=false
  mask=null
  static show = () => {
    this.status = true
    this.mask = new RootSiblings(<View style={styles.wrap} />)
    return this.mask
  }
  static hide = () => {
    this.status = false
    if (this.mask instanceof RootSiblings) {
      this.mask.destroy()
    } else {
      console.warn(`mask.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof mask}\` instead.`)
    }
  }
  static getStatus = () => {
    return this.status
  }
  /* _loading = null;
  componentWillMount = () => {
    this._loading = new RootSiblings(<LoaderScreen
      {...this.props}
    />)
  };
  componentWillReceiveProps = nextProps => {
    this._loading.update(<LoaderScreen
      {...nextProps}
    />)
  };
  componentWillUnmount = () => {
    this._loading.destroy()
  }; */
  render () {
    return (
      null
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1001
  }
})
