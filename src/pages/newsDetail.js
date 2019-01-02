import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import { configure, observable, action, computed } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio, height, statusBarHeight, axios, api, transferTime, navigator, transferPlayerTime, imageResize } from '../utils'
import Video from 'react-native-video'
import { Header, ItemHead, PlayBtn, NewsFooter } from '../components'
import { Player, Share } from '../../react-native-root-ui'
import _ from 'lodash'
import Config from '../config'
import playerStore from '../store/playerStore'
configure({
  enforceActions: 'always'
})
@observer class Play extends Component {
  @observable duration = '00:00'
  @computed get position () {
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
      <View paddingH-25>
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
@inject('routeStore', 'userStore')
@observer class Page extends Component {
  @observable reachBottom = true
  @observable duration = '00:00'
  @observable position = '00:00'
  @observable currentTime = 0
  @observable hideFooter = false
  @observable paused = true
  @observable data = {
  }
  @observable html = null
  @observable webviewHeight = 0
  @observable moreData = []
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
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
  onEnd = (e) => {
    this.setValue('paused', true)
    this.player.seek(0)
  }
  statistics = (type) => {
    axios.post(api.addNumber, {
      articleInfoId: this.data.id,
      type: type
    })
  }
  onProgress = (e) => {
    const { setValue } = this
    const { currentTime } = e
    setValue('position', transferPlayerTime(currentTime))
    setValue('currentTime', currentTime)
  }
  audioLoad = (e) => {
    const { setValue } = this
    const { duration } = e
    setValue('duration', transferPlayerTime(duration))
  }
  footerFunc = (e) => {
    console.log(this.props)

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
        console.log(this.props)
        const { setValue } = this.props.routeStore
        // (this.data.id)
        setValue('commentTabId', this.data.id)
        navigator.navigate('Comment')
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
    const { data, html, webviewHeight, moreData, duration, position, paused, hideFooter } = this
    const { getParam } = this.props.navigation
    return (
      <View flex useSafeArea onLayout={this.onLayout}>
        <Header
          showLeft
          btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }}
          containerStyle={styles.header}
          tintColor={colors.light} />
        <ScrollView ref='scroll' style={styles.scroll} onScroll={this.onScroll}>
          <View>
            {data.fileType === 2 && <View>
              <Video
                style={styles.video}
                paused={paused}
                source={{ uri: data.videoFile }}
                onLoad={this.audioLoad}
                onProgress={this.onProgress}
                progressUpdateInterval={1000}
                onEnd={this.onEnd}
                ref={(ref) => { this.player = ref }}
                resizeMode='cover'
              />
              {!paused
                ? <View row centerV paddingH-10 paddingV-2 bg-dark06 style={styles.playControls}>
                  <PlayBtn
                    size={20}
                    paused={paused}
                    onPress={this.play}
                  />
                  <Text text-12 marginL-5 stable>{position}/{duration}</Text>
                </View>
                : <PlayBtn
                  paused={paused}
                  style={styles.videoPaused}
                  onPress={this.play}
                />
              }
            </View>
            }
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
            />
          </View>
          <View center paddingV-30><Text text-12 dark06>--END</Text></View>
          {data.isMore &&
            <View paddingT-10>
              <ItemHead title='更多' seeAll='false' onPress={() => navigator.navigate('CommonList', { type: 1, specialTopicInfoId: data.specialTopInfoId, title: getParam('title') })} />
              <View marginH-25>
                {moreData.map((item) => (
                  <TouchableOpacity style={styles.item} key={item.id} onPress={() => navigator.push('NewsDetail', { articleId: item.id })}>
                    <Image source={{ uri: imageResize(data.picture, 200) }} style={{ width: 48, height: 48 }} borderRadius={8} />
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

        {!hideFooter &&
          <NewsFooter
            isCollect={this.data.isCollect}
            isPrise={this.data.isPrise}
            commentNumber={this.data.commentNumber}
            showCollect
            showLink={false}
            onPress={this.footerFunc}
          />
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
  componentWillUnmount () {
    this.didBlurEvent.remove()
    const { getParam } = this.props.navigation
    const { reachBottom } = this
    if (getParam('type') !== 'banner' && getParam('type') !== 'volunteer' && !reachBottom) {
      this.statistics(2)
    }
    // this.didFocusEvent.remove()
  }
  async componentDidMount () {
    const { getParam } = this.props.navigation
    const { setValue, reachBottom } = this
    const { addListener } = this.props.navigation
    this.didBlurEvent = addListener(
      'didBlur',
      payload => {
        const { routes } = this.props.routeStore
        const curpage = routes[routes.length - 1]
        setValue('paused', true)
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
              padding-bottom:20px
            }
            *{margin:0,padding:0}
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
  scroll: {
    flex: 1,
    zIndex: 1
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
    height: 250
  },
  webview: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  header: {
    position: 'absolute',
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
