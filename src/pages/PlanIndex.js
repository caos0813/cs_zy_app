import React, { Component } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { View, Text, LoaderScreen, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { observer, inject } from 'mobx-react/native'
import { HomeBanner, ItemHead, Item, CardItem, Header } from '../components'
import { UltimateListView } from 'react-native-ultimate-listview'
import { colors } from '../theme'
import { axios, api, imageResize, OpenUrl, formatDate } from '../utils'

@inject('planStore', 'userStore')
@observer class PlaneIndex extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      bannerActiveIndex: 0,
      animationConfig: {}
    }
  }
  // 转换时间
  transferTime = (date) => {
    let timeDiffer = ((new Date().getTime() - date) / (3600 * 1000))
    if (timeDiffer <= 1) {
      date = '刚刚'
    } else if (timeDiffer > 1 && timeDiffer <= 2) {
      date = '1小时前'
    } else if (timeDiffer > 2 && timeDiffer < 24) {
      date = `${Math.round(timeDiffer)}小时前`
    } else if (timeDiffer >= 24 && timeDiffer <= 48) {
      date = '昨天'
    } else if (timeDiffer > 48) {
      date = formatDate(date, 'M月d日')
    }
    return date
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  bannerPress = (item) => {
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    } else {
      this.openUrl(`article`, { id: item.id, type: 'banner' })
    }
  }
  renderContainer = (bannerData) => {
    const banner = bannerData.map(item => {
      let obj = item
      obj.image = item.picture
      return obj
    })
    const { firstArticle, firstTopic, topics } = this.props.planStore
    return (
      <View >
        <View style={{ height: 165 }} paddingT-10 paddingB-5>
          {banner.length > 0 && <HomeBanner data={banner} itemPress={(e) => this.bannerPress(e)} />}
        </View>
        {/* 文章1 */}
        {firstArticle && <View style={styles.article}>
          <ItemHead title={firstArticle.labelName} leftIcon='true' />
          <CardItem title={firstArticle.title} imageSource={{ uri: firstArticle.picture }} desc={firstArticle.introduction} bottomBar='true' releaseTime={this.transferTime(firstArticle.releaseTime)} priseNumber={firstArticle.priseNumber} commentNum={firstArticle.commentNumner} fileType={firstArticle.fileType} />
        </View>}
        {/* 专题1 */}
        {this.renderTopics(firstTopic)}
        {/* 剩余专题 */}
        {this.renderTopics(topics)}
      </View>
    )
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 5
    const { setValue } = this.props.planStore
    axios.get(api.queryModuleArticleInfo, {
      params: {
        moduleId: 5,
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      const { articleInfoLabelList, topicsAndArticlesList } = data.data
      if (page === 1) {
        setValue('firstArticle', articleInfoLabelList.content[0])
        let firstTopic = []
        firstTopic.push(topicsAndArticlesList.shift())
        setValue('firstTopic', firstTopic)
        setValue('topics', topicsAndArticlesList)
      }
      articleInfoLabelList.content.shift()
      startFetch(articleInfoLabelList.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderItem = (item, index, separator) => {
    return (
      <View style={styles.article} key={index}>
        <ItemHead title={item.labelName} leftIcon='true' />
        <CardItem title={item.title} imageSource={{ uri: item.picture }} desc={item.introduction} bottomBar='true' releaseTime={this.transferTime(item.releaseTime)} priseNumber={item.priseNumber} commentNum={item.commentNumner} fileType={item.fileType} />
      </View>
    )
  }
  // 专题
  renderTopics = (topicData) => {
    return (
      topicData.map((item, index) => (
        <View key={index}>
          <View paddingT-10>
            <ItemHead title={item.title} seeAll='true' />
          </View>
          <View row style={styles.topics}>
            {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
              item.articleInfoBean.content.map((el, i) => (
                <View style={styles.topic} key={i}>
                  <CardItem title={el.title} imageSource={{ uri: el.picture }} desc={el.introduction} fileType={item.fileType} />
                </View>
              ))
            }
          </View >
        </View>
      ))
    )
  }

  render () {
    const { bannerData } = this.props.planStore
    return (
      <View flex>
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
    const { setValue } = this.props.planStore
    axios.get(api.queryHomePageBannerInfo, { params: { moduleId: 5 } }).then(data => {
      setValue('bannerData', data.data.content)
    })
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
  }
})
export default PlaneIndex
