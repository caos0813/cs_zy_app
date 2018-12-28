import React, { Component } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { View, Text, LoaderScreen, Image } from '../../react-native-ui-lib'
import { observer, inject } from 'mobx-react/native'
import { HomeBanner, ItemHead, CardItem, Header, NoNetwork } from '../components'
import { UltimateListView } from 'react-native-ultimate-listview'
import { colors } from '../theme'
import { axios, api, imageResize, OpenUrl, transferTime, navigator } from '../utils'
import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})

@inject('planStore', 'userStore')
@observer class PlaneIndex extends Component {
  @observable bannerData = []
  @observable firstArticle = {}
  @observable topics = []
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      bannerActiveIndex: 0,
      animationConfig: {}
    }
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  bannerPress = (item) => {
    // if (item.link) {
    //   Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    // } else {
    //   this.openUrl(`article`, { id: item.id, type: 'banner' })
    // }
    this.openNative('NewsDetail', { articleId: item.id })
  }
  renderContainer = (bannerData) => {
    // const banner = bannerData.map(item => {
    //   let obj = item
    //   obj.image = item.picture
    //   return obj
    // })
    // alert(JSON.stringify(this.topics))
    return (
      <View >
        {/* <View style={{ height: 165 }} paddingT-10 paddingB-5>
          {banner.length > 0 && <HomeBanner data={banner} itemPress={(e) => this.bannerPress(e)} />}
        </View> */}
        {/* 文章1 */}
        {this.firstArticle && <View style={styles.article}>
          <ItemHead smallText='true' title={this.firstArticle.labelName} leftIcon='true' />
          <CardItem onPress={() => { navigator.push('NewsDetail', { articleId: this.firstArticle.id }) }} imageStyle={{ height: 115 }} title={this.firstArticle.title} imageSource={{ uri: this.firstArticle.picture }} desc={this.firstArticle.introduction} fileType={this.firstArticle.fileType}>
            <View style={styles.cardFooter} paddingT-5>
              <View row>
                <View row centerV paddingR-10>
                  <Image assetName='attention' style={styles.cardItemImage} />
                  <Text dark06 text-11>{this.firstArticle.priseNumber}</Text>
                </View>
                <View row centerV>
                  <Image assetName='comment' style={styles.cardItemImage} />
                  <Text dark06 text-11>{this.firstArticle.commentNumber}</Text>
                </View>
              </View>
              <Text dark06 text-11>{transferTime(this.firstArticle.releaseTime)}</Text>
            </View>
          </CardItem>
        </View>}
        {/* 专题 */}
        {this.renderTopics(this.topics)}
      </View>
    )
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 5
    axios.get(api.queryModuleArticleInfo, {
      params: {
        moduleId: 5,
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      const { articleInfoLabelList, topicsAndArticlesList } = data
      // alert(JSON.stringify(topicsAndArticlesList))
      if (page === 1) {
        if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
          this.setValue('firstArticle', articleInfoLabelList.content[0])
        } else {
          this.setValue('firstArticle', [])
        }
        if (topicsAndArticlesList && topicsAndArticlesList.length > 0) {
          // let firstTopic = []
          // firstTopic.push(topicsAndArticlesList.shift())
          // this.setValue('firstTopic', firstTopic)
          this.setValue('topics', topicsAndArticlesList)
        } else {
          // this.setValue('firstTopic', [])
          this.setValue('topics', [])
        }
      }
      if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
        if (articleInfoLabelList.content.length === 1 && page <= 1) {
        //  alert('只有一个，在第一页，所以删除一个')
          articleInfoLabelList.content.shift()
        }
        startFetch(articleInfoLabelList.content, pageSize)
      } else {
        startFetch([], pageSize)
      }
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderItem = (item, index, separator) => {
    if (index === 0) {
      return null
    } else {
      return (
        <View style={styles.article} key={index} >
          <ItemHead smallText='true' title={item.labelName} leftIcon='true' />
          <CardItem onPress={() => { navigator.push('NewsDetail', { articleId: item.id }) }} imageStyle={{ height: 115 }} title={item.title} imageSource={{ uri: item.picture }} desc={item.introduction} fileType={item.fileType}>
            <View style={styles.cardFooter} paddingT-5>
              <View row>
                <View row centerV paddingR-10>
                  <Image assetName='attention' style={styles.cardItemImage} />
                  <Text dark06 text-11>{item.priseNumber}</Text>
                </View>
                <View row centerV>
                  <Image assetName='comment' style={styles.cardItemImage} />
                  <Text dark06 text-11>{item.commentNumber}</Text>
                </View>
              </View>
              <Text dark06 text-11>{transferTime(item.releaseTime)}</Text>
            </View>
          </CardItem>
        </View>
      )
    }
  }
  // 专题
  renderTopics = (topicData) => {
    return (
      topicData.map((item, index) => (
        <View key={index}>
          <View paddingT-10>
            <ItemHead title={item.title} seeAll='true' onPress={() => navigator.push('CommonList', { type: 1, specialTopicInfoId: item.id, title: item.title })} />
          </View>
          <View row style={styles.topics}>
            {item.articleInfoBean.content &&
              item.articleInfoBean.content.map((el, i) => (
                <View style={[styles.topic, item.articleInfoBean.content.length === 1 ? styles.one : '']} key={i}>
                  <CardItem onPress={() => { navigator.push('NewsDetail', { articleId: el.id, title: item.title }) }} title={el.title} imageSource={{ uri: el.picture }} imageStyle={{ height: item.articleInfoBean.content.length === 1 ? 115 : 85 }} desc={el.introduction} fileType={el.fileType} />
                </View>
              ))
            }
          </View >
        </View>
      ))
    )
  }

  render () {
    const { bannerData } = this
    return (
      <View flex useSafeArea>
        {/* <NoNetwork refresh={this.refresh} /> */}
        <Header showLeft={false} title='生涯规划' />
        <UltimateListView ref='scroll' style={{ flex: 1, backgroundColor: colors.light }} keyExtractor={(item, index) => `${index} - ${item}`}
          header={() => this.renderContainer(bannerData)}
          onFetch={this.onFetch}
          item={this.renderItem}
          refreshable={false}
          waitingSpinnerText='正在加载...'
          spinnerColor={colors.calm}
          allLoadedText='--我是有底线的--'
          // onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          paginationFetchingView={() => <LoaderScreen color={colors.dark09} messageStyle={{ color: colors.dark09 }} message='正在加载...' />}
        // emptyView={() => <View flex center><Text dark06>暂时没有内容</Text></View>}
        />

      </View>
    )
  }

  componentDidMount () {
    // axios.get(api.queryHomePageBannerInfo, { params: { moduleId: 5 } }).then(data => {
    //   this.setValue('bannerData', data.content)
    // })
  }
}

const styles = StyleSheet.create({
  article: {
    paddingHorizontal: 12
  },
  topics: {
    flexWrap: 'wrap',
    paddingHorizontal: 3
  },
  topic: {
    paddingHorizontal: 12,
    paddingBottom: 15,
    width: '50%'
  },
  cardItemImage: {
    width: 12,
    height: 10,
    marginRight: 2,
    tintColor: colors.dark06
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  one: {
    width: '100%'
  }
})
export default PlaneIndex
