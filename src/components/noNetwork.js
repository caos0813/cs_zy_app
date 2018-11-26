import React, { Component } from 'react'
import { Image, Text, Button } from '../../react-native-ui-lib/src'
import { StyleSheet, NetInfo } from 'react-native'
import * as Animatable from 'react-native-animatable'
import PropTypes from 'prop-types'
import { colors } from '../theme'
export default class NoNetwork extends Component {
  static propTypes={
    refresh: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      animationConfig: {},
      show: false
    }
  }
  render () {
    const { show, animationConfig } = this.state
    return (
      show &&
      <Animatable.View style={styles.container} {...animationConfig}>
        <Image assetName='logo' style={{ width: 150, height: 150 }} />
        <Text dark06 text-16 marginT-10 marginB-5>数据加载失败</Text>
        <Text dark09 text-14>请确认您的手机已经联网</Text>
        <Button marginT-20 label='重新加载' onPress={() => this.refresh(true)} />
      </Animatable.View>
    )
  }
  refresh = (flag) => {
    const { refresh } = this.props
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        this.setState({
          show: true
        })
      } else {
        if (flag) {
          refresh()
        }
        this.setState({
          animationConfig: {
            animation: 'fadeOut',
            duration: 300,
            onAnimationEnd: () => {
              this.setState({ show: false })
            }
          }
        })
      }
    })
  }
  componentDidMount () {
    this.refresh()
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    left: 0,
    top: 0
  }
})
