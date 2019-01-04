import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import { configure, observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio, height, statusBarHeight, axios, api, transferTime, navigator, transferPlayerTime, OpenUrl } from '../utils'
import Video from 'react-native-video'
import { Header, ItemHead, PlayBtn, NewsFooter } from '../components'
import { Player, Share } from '../../react-native-root-ui'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
@inject('routeStore', 'userStore')
@observer class Page extends Component {
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
    this.OpenUrl = new OpenUrl(props)
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
  }
  onEnd = (e) => {
    this.setValue('paused', true)
    this.player.seek(0)
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
    let copyData = _.clone(this.data)
    switch (e) {
      case 'share':
        Share.show({
          thumbImage: this.data.picture,
          // description: PropTypes.string,
          title: this.data.title,
          // webpageUrl: PropTypes.string,
          shareCallback: () => {

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
        navigator.push('Comment', { articleInfoId: this.data.id })
        break
    }
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  render () {
    const { data, html, webviewHeight, moreData, duration, position, paused, hideFooter } = this
    const { params } = this.props.navigation.state
    return (
      <View flex useSafeArea>
        <Header
          showLeft
          btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }}
          containerStyle={styles.header}
          tintColor={colors.light} />
        <ScrollView style={styles.scroll}>
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
              source={{ uri: data.picture }} /> : null
            }
          </View>
          <View paddingV-50 paddingH-25 center>
            <Text text-24 dark>{data.title}</Text>
            <Text text-14 dark06 marginT-20>{transferTime(data.releaseTime)}</Text>
          </View>
          {data.fileType === 1 &&
            <View paddingH-25>
              <TouchableOpacity style={styles.item} onPress={this.play}>
                <Video
                  paused={paused}
                  source={{ uri: data.videoFile }}
                  onLoad={this.audioLoad}
                  onProgress={this.onProgress}
                  progressUpdateInterval={200}
                  onEnd={this.onEnd}
                  ref={(ref) => { this.player = ref }}
                />
                <Image
                  borderRadius={8}
                  source={{ uri: data.picture }}
                  style={{ width: 48, height: 48 }} />
                <View paddingL-7 flex>
                  <Text text-16 dark>{data.title}</Text>
                  <Text text-12 dark06>{position}/{duration}</Text>
                </View>
                <Image assetName={paused ? 'playerPlay' : 'playerPause'} tintColor={colors.dark} />
              </TouchableOpacity>
            </View>
          }
          <View paddingH-20>
            <WebView
              style={[styles.webview, { height: webviewHeight }]}
              source={{ html: html }}
              onNavigationStateChange={this.onNavigationStateChange}
            />
          </View>
          <View center paddingV-30><Text text-12 dark06>--END</Text></View>
          {data.isMore &&
            <View paddingT-10>
              <ItemHead onPress={() => navigator.push('CommonList', { type: 1, specialTopicInfoId: data.specialTopInfoId, title: params.title })} title='更多' seeAll='true' />
              {/* <ItemHead title='更多' seeAll='true' /> */}
              <View paddingH-25>
                {moreData.map((item) => (
                  <TouchableOpacity style={styles.item} key={item.id} onPress={() => navigator.push('NewsDetail', { articleId: item.id })}>
                    <Image source={{ uri: item.picture }} style={{ width: 48, height: 48 }} borderRadius={8} />
                    <View paddingL-7>
                      <Text text-16 dark>{item.title}</Text>
                      <Text text-12 dark06>{item.introduction}</Text>
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
    const { routes } = this.props.routeStore
    const curpage = routes[routes.length - 1]
    if (curpage.routeName !== 'NewsDetail' && this.data.fileType === 1 && !this.paused) {
      Player.play({
        id: this.data.id,
        url: this.data.videoFile,
        title: this.data.title,
        image: this.data.picture,
        currentTime: this.currentTime,
        others: this.data
      })
    }

    // this.didFocusEvent.remove()
  }
  componentDidMount () {
    const { routes } = this.props.routeStore
    console.log(routes)
    const { getParam } = this.props.navigation
    const { setValue } = this
    const { addListener } = this.props.navigation
    this.didBlurEvent = addListener(
      'didBlur',
      payload => {
        // this.playerEvent.remove()
        setValue('paused', true)
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
      if (Player.player) {
        const { id, currentTime } = Player.getPlayerConfig()
        Player.close()
        if (id == getParam('articleId')) {
          this.player.seek(currentTime)
          this.onProgress({ currentTime })
        }
      }
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
