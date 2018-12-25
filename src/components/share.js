import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Assets, Image, TouchableOpacity } from '../../react-native-ui-lib'
import * as WeChat from 'react-native-wechat'
import JShareModule from 'jshare-react-native'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import Header from './header'
import { platform } from '../utils'
Assets.loadAssetsGroup('share', {
  close: require('../assets/share/close.png'),
  wechat: require('../assets/share/wechat.png'),
  timeline: require('../assets/share/timeline.png'),
  qq: require('../assets/share/qq.png'),
  weibo: require('../assets/share/weibo.png')
})
export default class Share extends Component {
  static propTypes={
    thumbImage: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    webpageUrl: PropTypes.string,
    shareCallback: PropTypes.func,
    close: PropTypes.func
  }
  state={
    isWXAppInstalled: true,
    isQQInstalled: false,
    isWeiboInstalled: false
  }
  share=(type) => {
    const { thumbImage, description, title, webpageUrl, shareCallback } = this.props
    switch (type) {
      case 0:// 分享好友
        WeChat.shareToSession({
          type: 'news',
          thumbImage,
          title,
          webpageUrl,
          description
        }).then(data => {
          shareCallback && shareCallback()
        })

        break
      case 1: // 分享给qq好友
        WeChat.shareToTimeline({
          type: 'news',
          thumbImage,
          title,
          webpageUrl,
          description
        }).then(data => {
          shareCallback && shareCallback()
        })
        break
      case 2: // 分享给qq好友
        JShareModule.share({
          platformString: 'qq',
          type: 'link',
          imageUrl: thumbImage,
          title,
          url: webpageUrl,
          text: description
        }, (data) => {
          shareCallback && shareCallback()
        })
        break
      case 3: // 分享给微博
        JShareModule.share({
          platformString: 'sina_weibo',
          type: 'link',
          imageUrl: thumbImage,
          title,
          url: webpageUrl,
          text: description
        }, (data) => {
          shareCallback && shareCallback()
        })
    }
  }
  close=() => {
    const { close } = this.props
    close && close()
  }
  render () {
    const { isWXAppInstalled, isQQInstalled, isWeiboInstalled } = this.state
    return (
      <View style={styles.shareWrap}>
        <Header
          leftContainer={<Image assetName='close' assetGroup='share' />}
          containerStyle={styles.header}
          leftPress={this.close}
          title='分享'
        />
        <View row paddingV-50 paddingH-50 style={styles.ceilWrap}>
          {(!isWXAppInstalled && !isQQInstalled && !isWeiboInstalled) ? <Text dark text-16>暂时不支持分享功能</Text> : null}
          {isWXAppInstalled &&
            <TouchableOpacity activeOpacity={0.7} style={styles.ceil}>
              <Image assetName='timeline' assetGroup='share' />
              <Text text-12 dark06 marginT-3>朋友圈</Text>
            </TouchableOpacity>
          }
          {isWXAppInstalled &&
            <TouchableOpacity activeOpacity={0.7} style={styles.ceil}>
              <Image assetName='wechat' assetGroup='share' />
              <Text text-12 dark06 marginT-3>微信</Text>
            </TouchableOpacity>
          }
          {isQQInstalled &&
            <TouchableOpacity activeOpacity={0.7} style={styles.ceil}>
              <Image assetName='qq' assetGroup='share' />
              <Text text-12 dark06 marginT-3>QQ</Text>
            </TouchableOpacity>
          }
          {isWeiboInstalled &&
            <TouchableOpacity activeOpacity={0.7} style={styles.ceil}>
              <Image assetName='weibo' assetGroup='share' />
              <Text text-12 dark06 marginT-3>微博</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

    )
  }
  async componentDidMount () {
    if (platform === 'ios') {
      JShareModule.setup()
    }
    JShareModule.isQQInstalled((result) => {
      this.setState({
        isQQInstalled: result
      })
    })
    JShareModule.isSinaWeiBoInstalled((result) => {
      this.setState({
        isWeiboInstalled: result
      })
    })
    this.setState({
      isWXAppInstalled: await WeChat.isWXAppInstalled()
    })
  }
}
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.4)',
    zIndex: 1003,
    top: 0,
    left: 0,
    bottom: 0
  },
  header: {
    height: 50,
    paddingTop: 0
  },
  ceilWrap: {
    justifyContent: 'space-around'
  },
  shareWrap: {
    position: 'absolute',
    backgroundColor: colors.light,
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  ceil: {
    alignItems: 'center'
  }
})
