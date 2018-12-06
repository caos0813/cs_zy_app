import React, { Component } from 'react'
import { LoaderScreen } from '../../react-native-ui-lib'
import RootSiblings from 'react-native-root-siblings'
import { colors } from '../../src/theme'
export default class Loading extends Component {
  loading=null
  static show = (msg = '正在加载', options = {}) => {
    const obj = {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      loaderColor: colors.grey,
      messageStyle: {
        color: colors.grey
      },
      overlay: true,
      message: msg,
      ...options
    }
    this.loading = new RootSiblings(<LoaderScreen {...obj} />)
    return this.loading
  }
  static hide = () => {
    if (this.loading instanceof RootSiblings) {
      this.loading.destroy()
    } else {
      console.warn(`Loading.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof loading}\` instead.`)
    }
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
