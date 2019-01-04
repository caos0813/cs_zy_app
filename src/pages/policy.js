import React, { Component } from 'react'
import { View, LoaderScreen } from '../../react-native-ui-lib'
import { WebView } from 'react-native-webview'
import { colors } from './../theme'
import { NoNetwork } from '../components'
export default class Policy extends Component {
  constructor (props) {
    super(props)
  }
  refresh = () => {
    const { state, replace } = this.props.navigation
    replace(state)
  }
  render () {
    const { getParam } = this.props.navigation
    const path = getParam('path')
    return (
      <View flex useSafeArea>
        <NoNetwork refresh={this.refresh} />
        <WebView ref='webview'
          bounces={false}
          style={{ backgroundColor: colors.stable }}
          source={{ uri: `${path}` }}
          useWebKit={false}
          renderLoading={() => <LoaderScreen message='正在加载' messageStyle={{ color: colors.dark09 }}
            overlay />}
          startInLoadingState
        />
      </View>
    )
  }
}
