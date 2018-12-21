import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import { inject, observer } from 'mobx-react/native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio, height, statusBarHeight, axios, api, transferTime, OpenUrl } from '../utils'
import Video from 'react-native-video'
import { Header, ItemHead } from '../components'
@inject('newsDetailStore')
@observer class Page extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
  }
  onNavigationStateChange = (e) => {
    const { title } = e
    const { setValue } = this.props.newsDetailStore
    if (title) {
      setValue('webviewHeight', parseInt(title))
    }
  }
  openPush = (path, query, auth) => {
    this.OpenUrl.openPush(path, query, auth)
  }
  render () {
    const { data, html, webviewHeight, moreData } = this.props.newsDetailStore
    return (
      <View flex useSafeArea>
        <Header
          showLeft
          btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }}
          containerStyle={styles.header}
          tintColor={colors.light} />
        <ScrollView style={styles.scroll}>
          <View>
            {data.fileType === 2 && <Video
              style={styles.video}
              paused
              source={{ uri: data.videoFile }}
            />
            }
            {data.fileType === 1 &&
              <Image
                style={styles.coverImage}
                source={{ uri: data.picture }} />
            }
          </View>
          <View paddingV-50 center>
            <Text text-24 dark>{data.title}</Text>
            <Text text-14 dark06 marginT-20>{transferTime(data.releaseTime)}</Text>
          </View>
          {data.fileType === 1 &&
            <View paddingH-25>
              <TouchableOpacity style={styles.item} >
                <Image
                  borderRadius={8}
                  source={{ uri: data.picture }}
                  style={{ width: 48, height: 48 }} />
                <View paddingL-7 flex>
                  <Text text-16 dark>{data.title}</Text>
                  <Text text-12 dark06>3:23&nbsp;&nbsp;&nbsp;&nbsp;3MB</Text>
                </View>
                <Image assetName='playerPlay' tintColor={colors.dark} />
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
              <ItemHead title='更多课程' seeAll='true' />
              <View paddingH-25>
                {moreData.map((item) => (
                  <TouchableOpacity style={styles.item} key={item.id} onPress={() => openPush('NewsDetail', { id: item.id })}>
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
        <View style={styles.footer} >
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='attention' tintColor={data.isPrise ? colors.assertive : colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='comment' />
            <Text text-14 dark06 marginL-5>{data.commentNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='share' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  getMore = (specialTopicInfoId, id) => {
    const { setValue } = this.props.newsDetailStore
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
  componentDidMount () {
    const { getParam } = this.props.navigation
    const { setValue } = this.props.newsDetailStore
    axios.get(api.queryArticleInfoDetails, {
      params: {
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
    flex: 1
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
    width: '100%'
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
