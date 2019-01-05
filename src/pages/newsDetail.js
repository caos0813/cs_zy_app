import React, { Component } from 'react'
import { StyleSheet, ScrollView, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'
import { configure, observable, action, computed } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio, width, height, statusBarHeight, axios, api, transferTime, navigator, transferPlayerTime, imageResize, BackPress } from '../utils'
import Video from 'react-native-video'
import { Header, ItemHead, NewsFooter } from '../components'
import { Player, Share } from '../../react-native-root-ui'
import _ from 'lodash'
import Config from '../config'
import playerStore from '../store/playerStore'
import { NavigationActions } from 'react-navigation'
import VideoPlayer from '../../react-native-video-controls'
import Orientation from 'react-native-orientation'
configure({
  enforceActions: 'always'
})
@observer class Play extends Component {
  @observable duration = '00:00'
  @computed get position () {
    console.log(this.props)
    const { position, id } = this.props.playerStore
    if (id === this.props.data.id) {
      return position
    } else {
      return '00:00'
    }
  }
  @computed get paused () {
    const { paused, id } = this.props.playerStore
    if (id === this.props.data.id) {
      return paused
    } else {
      return true
    }
  }
  @action.bound
  setDuration (num) {
    this.duration = num
  }
  constructor (props) {
    super(props)
    this.setValue = props.playerStore.setValue
  }
  audioLoad = (e) => {
    const { duration } = e
    this.setDuration(transferPlayerTime(duration))
  }
  play = () => {
    const { id, videoFile, title, picture } = this.props.data
    const playId = this.props.playerStore.id
    if (Player.player && id === playId) {
      Player.pause()
    } else {
      Player.play({
        id: id,
        url: videoFile,
        title: title,
        image: picture
      })
    }
  }
  render () {
    const { position, duration, paused } = this
    const { videoFile, picture, title } = this.props.data
    return (
      <View paddingH-25 >
        <TouchableOpacity style={styles.item} onPress={this.play}>
          <Video
            paused
            source={{ uri: videoFile }}
            onLoad={this.audioLoad}
          />
          <Image
            borderRadius={8}
            source={{ uri: imageResize(picture, 600) }}
            style={{ width: 48, height: 48 }} />
          <View paddingL-7 flex>
            <Text text-16 dark>{title}</Text>
            <Text text-12 dark06>{position}/{duration}</Text>
          </View>
          <Image assetName={paused ? 'playerPlay' : 'playerPause'} tintColor={colors.dark} />
        </TouchableOpacity>
      </View>

    )
  }
}
@inject('routeStore')
@observer class Page extends Component {
  @observable reachBottom = true
  @observable duration = '00:00'
  @observable position = '00:00'
  @observable currentTime = 0
  @observable hideFooter = false
  @observable paused = true
  @observable fullScreen = false
  @observable data = {
  }
  @observable html = ''
  @observable webviewHeight = 0
  @observable moreData = []
  @action.bound
  setValue (key, val) {
    console.log(key, val)
    this[key] = val
  }
  constructor (props) {
    super(props)
    this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  onBackPress = () => {
    const status = Share.shareDom
    if (status) {
      Share.close()
      return true
    } else if (this.fullScreen) {
      this.setValue('fullScreen', false)
      Orientation.lockToPortrait()
      return true
    } else {
      return false
    }
  }
  onNavigationStateChange = (e) => {
    const { title } = e
    const { setValue } = this
    if (title) {
      setValue('webviewHeight', parseInt(title))
    }
  }
  play = () => {
    const { setValue, paused } = this
    setValue('paused', !paused)
    Player.player && Player.close()
  }

  statistics = (type) => {
    axios.post(api.addNumber, {
      articleInfoId: this.data.id,
      type: type
    })
  }

  footerFunc = (e) => {
    let copyData = _.clone(this.data)
    const webpageUrl = `${Config.WEB_URL.split('#')[0]}?platform=0#/article?id=${this.data.id}`
    switch (e) {
      case 'share':
        Share.show({
          thumbImage: this.data.picture,
          description: '',
          title: this.data.title,
          webpageUrl,
          shareCallback: () => {
            this.statistics(3)
            Share.close()
          }
        })
        break
      case 'attention':
        axios.post(api.changePraiseState, { articleInfoId: this.data.id }).then(data => {
          copyData.isPrise = !copyData.isPrise
          this.setValue('data', copyData)
        })
        break
      case 'star':
        axios.post(api.changePraiseCollect, { articleInfoId: this.data.id }).then(data => {
          copyData.isCollect = !copyData.isCollect
          this.setValue('data', copyData)
        })
        break
      case 'comment':
        // navigator.navigate('Comment', { articleId: this.data.id })
        const { setValue } = this.props.routeStore
        setValue('commentTabId', this.data.id)
        navigator.navigate('Comment', { articleId: this.data.id },
          NavigationActions.navigate({
            routeName: 'Comment',
            params: { refresh: (e) => this.refreshComment(e) }
          })
        )
        break
    }
  }
onLayout = (e) => {
  let { layout } = e.nativeEvent
  const clientHeight = height - 50
  if (layout.height >= clientHeight) {
    this.setValue('reachBottom', false)
  } else {
    this.setValue('reachBottom', true)
  }
}
onScroll = (e) => {
  const offsetY = e.nativeEvent.contentOffset.y // 滑动距离
  const contentSizeHeight = e.nativeEvent.contentSize.height // scrollView contentSize高度
  const oriageScrollHeight = e.nativeEvent.layoutMeasurement.height // scrollView高度
  if (offsetY + oriageScrollHeight >= contentSizeHeight - 100) {
    this.setValue('reachBottom', true)
  }
}
render () {
  const { data, html, webviewHeight, moreData, fullScreen, hideFooter, setValue, paused } = this
  const { getParam } = this.props.navigation
  return (
    <View flex onLayout={this.onLayout}>
      <Header
        showLeft
        btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }}
        containerStyle={styles.header}
        tintColor={colors.light} />
      <ScrollView ref='scroll' style={[styles.scroll, fullScreen && styles.scrollFullScreen]} onScroll={this.onScroll} scrollEnabled={!fullScreen}>
        {data.fileType === 2 && <View style={fullScreen ? styles.fullScreen : styles.video}
        >
          <VideoPlayer
            ref={ref => { this.videoPlayer = ref }}
            // paused={paused}
            onPlay={() => {
              Player.player && Player.close()
            }}

            onEnterFullscreen={() => {
              setValue('fullScreen', true)
              this.refs.scroll.scrollTo({ y: 0 })
              Orientation.lockToLandscapeLeft()
            }}
            onExitFullscreen={() => {
              setValue('fullScreen', false)
              Orientation.lockToPortrait()
            }}
            style={{ width: '100%', height: '100%' }}
            // playWhenInactive={false}
            disableBack
            disableVolume
            toggleResizeModeOnFullscreen={false}
            controlTimeout={4000}
            source={{ uri: data.videoFile }}
          />
        </View>
        }
        <View >
          {(data.fileType !== 2 && data.picture) ? <Image
            style={styles.coverImage}
            source={{ uri: imageResize(data.picture, 600) }} /> : null
          }
        </View>
        <View paddingV-50 paddingH-25 center>
          <Text text-24 dark>{data.title}</Text>
          <Text text-14 dark06 marginT-20>{transferTime(data.releaseTime)}</Text>
        </View>
        {data.fileType === 1 &&
        <Play playerStore={playerStore} data={this.data} />
        }
        <View paddingH-20>
          <WebView
            style={[styles.webview, { height: webviewHeight }]}
            source={{ html: html }}
            bounces={false}
            onNavigationStateChange={this.onNavigationStateChange}
            useWebKit
            scrollEnabled={false}
          />
        </View>
        <View center paddingV-30><Text text-12 dark06>--END</Text></View>
        {data.isMore &&
          <View paddingT-10>
            <ItemHead title='更多' seeAll='false' onPress={() => navigator.navigate('CommonList', { type: 1, specialTopicInfoId: data.specialTopInfoId, title: getParam('title') })} />
            <View marginH-25>
              {moreData.map((item) => (
                <TouchableOpacity style={styles.item} key={item.id} onPress={() => navigator.push('NewsDetail', { articleId: item.id })}>
                  <Image source={{ uri: imageResize(item.picture, 200) }} style={{ width: 48, height: 48 }} borderRadius={8} />
                  <View paddingL-7 style={{ flex: 1 }}>
                    <Text text-16 dark numberOfLines={2}>{item.title}</Text>
                    <Text text-12 dark06 numberOfLines={2} ellipsizeMode='tail'>{item.introduction}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
      </ScrollView>

      {(!hideFooter && !fullScreen)
        ? <NewsFooter
          isCollect={this.data.isCollect}
          isPrise={this.data.isPrise}
          commentNumber={this.data.commentNumber}
          showCollect
          showLink={false}
          onPress={this.footerFunc}
        /> : null
      }
    </View>
  )
}
getMore = (specialTopicInfoId, id) => {
  const { setValue } = this
  axios.get(api.queryArticleInfoViewMore, {
    params: {
      specialTopicInfoId: specialTopicInfoId,
      id: id,
      size: 4,
      page: 0
    }
  }).then(data => {
    setValue('moreData', data.content)
  })
}
refreshComment=(num) => {
  let data = _.clone(this.data)
  data.commentNumber = num
  this.setValue('data', data)
}
componentWillUnmount () {
  this.didBlurEvent.remove()
  const { getParam } = this.props.navigation
  const { reachBottom } = this
  if (getParam('type') !== 'banner' && getParam('type') !== 'volunteer' && !reachBottom) {
    this.statistics(2)
  }
  // this.didFocusEvent.remove()
  this.backPress.componentWillUnmount()
  StatusBar.setBarStyle('dark-content')
}
async componentDidMount () {
  const { getParam } = this.props.navigation
  const { setValue, reachBottom } = this
  const { addListener } = this.props.navigation
  this.backPress.componentDidMount()
  StatusBar.setBarStyle('light-content')
  this.didBlurEvent = addListener(
    'didBlur',
    payload => {
      const { routes } = this.props.routeStore
      const curpage = routes[routes.length - 1]
      this.videoPlayer && this.videoPlayer.playerPause()
      if (curpage.routeName !== 'NewsDetail' && getParam('type') !== 'banner' && getParam('type') !== 'volunteer' && !reachBottom) {
        this.statistics(2)
      }
    }
  )
  let apiUrl = getParam('type') === 'banner' ? api.bannerDetail : api.queryArticleInfoDetails
  if (getParam('type') === 'banner' || getParam('type') === 'volunteer') {
    setValue('hideFooter', true)
  }
  axios.get(apiUrl, {
    params: {
      id: getParam('articleId'),
      articleInfoId: getParam('articleId')
    }
  }).then(data => {
    if (data.isMore) {
      this.getMore(data.specialTopInfoId, data.id)
    }
    setValue('data', data)
    setValue('html', `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">
          <style>
            body{
              color:${colors.dark};
              font-size:14px;
              line-height:1.5;
              overflow:hidden;
              padding-bottom:50px;
            }
            *{margin:0,padding:0}
            table{
              width:100%!important;
            }
            img{
              width:100%!important;
              height:auto!important;
            }
            h2{
              font-size:18px
            }
            h3{
              font-size:16px
            }
          </style>
        </head>
        <body>
         ${data.content}
          <script>
            window.onload=function(){ 
              window.location.hash = '#' + document.body.clientHeight;
              document.title = document.body.clientHeight;
            }
          </script>
        </body>
      </html>
      `)
  })
}
}

const styles = StyleSheet.create({
  playControls: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    left: 0,
    bottom: 0
  },
  videoPaused: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -18,
    marginLeft: -18
  },
  videoPlay: {
    position: 'absolute',
    left: '50%',
    top: '50%'
  },
  item: {
    display: 'flex',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: colors.stable,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  modal: {
    top: 0,
    left: 0,
    height: height - statusBarHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    width: '100%',
    zIndex: 99
  },
  footer: {
    borderTopColor: colors.grey,
    borderTopWidth: 1 / ratio,
    flexDirection: 'row',
    height: 50
  },
  footerCeil: {
    height: '100%',
    flexDirection: 'row',
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    overflow: 'hidden',
    height: 250
  },
  scroll: {
    flex: 1
  },
  scrollFullScreen: {
    zIndex: 100
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: width,
    zIndex: 100,
    backgroundColor: colors.positive
  },
  webview: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  header: {
    position: 'absolute',
    width: 100,
    top: 0,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  coverImage: {
    width: '100%',
    height: 250
  }
})
export default Page
