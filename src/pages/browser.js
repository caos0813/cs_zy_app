import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'
import { View, LoaderScreen } from 'react-native-ui-lib'
import { colors } from './../theme'
export default class Browser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  onLoadEnd = () => {
    setTimeout(() => {
      this.setState({
        animationConfig: {
          animation: 'fadeOut',
          onAnimationEnd: () => this.setState({ loading: false })
        }
      })
    }, 800)
  }
  onNavigationStateChange = (e) => {
    this.setState({
      loading: true
    })
  }
  render () {
    const { loading, animationConfig } = this.state
    return (
      <View flex>
        {loading &&
          <LoaderScreen
            color={colors.positive}
            message='正在加载...'
            overlay
            // backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
            {...animationConfig}
          />}

        <WebView style={styles.flex_1}
          source={{ uri: 'http://hotipay.luhesj.com/www/#/forget' }}
          onLoadEnd={this.onLoadEnd} onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    zIndex: 1
  }
})
