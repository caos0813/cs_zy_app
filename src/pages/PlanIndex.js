import React, { Component } from 'react'
import { Linking } from 'react-native'
import { View, Text, LoaderScreen, TouchableOpacity, Image } from '../../react-native-ui-lib'
import { observer, inject } from 'mobx-react/native'
import { HomeBanner, ItemHead, Item } from '../components'
import { UltimateListView } from 'react-native-ultimate-listview'
import { colors } from '../theme'
import { axios, api, imageResize, OpenUrl } from '../utils'

@inject('homeStore', 'userStore')
@observer class PlaneIndex extends Component {
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
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    } else {
      this.openUrl(`article`, { id: item.id, type: 'banner' })
    }
  }
  renderContainer = (bannerData) => {
    const banner = bannerData.map(item => {
      return item
    })
    const lists = [{
      title: '最科学的填报志愿方法',
      text: '50位专家共同参与设计的科学填报法，为你定制最佳的志愿方案。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem01',
      time: 1544758251211
    }]
    const listItems = [{
      title: '最科学的填报志愿方法',
      text: '50位专家共同参与设计的科学填报法，为你定制最佳的志愿方案。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem01',
      time: 1544758251211
    }, {
      title: '最精准的数据支撑好滴hi好的撒会对的撒',
      text: '院校、专业录取数据、招生计划与考试院同步更新。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem02',
      time: 1547360000000
    }, {
      title: '最专业的生涯顾问服务',
      text: '生涯规划专家、教育专家、高级教师实时指导，为学生提供精准定制服务，辅助生涯规划决策。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem03',
      time: 1540060000000
    }, {
      title: '最智能的生涯测评',
      text: '为你提供最全面、最客观的”专业“评价，让你更多元、更深入的了解专业。',
      img: 'payitem04',
      time: 1530060000000
    }]
    // listItems.map((item, index) => {
    //   item.time = this.transferTime(item.time)
    // })
    return (
      <View >
        <View style={{ height: 165 }} paddingT-10 paddingB-5>
          {banner.length > 0 && <HomeBanner data={banner} itemPress={(e) => this.bannerPress(e)} />}
        </View>
        <ItemHead title='学业能力' leftIcon='true' />
        <Item lists={lists} width='100%' wapHeight={117} bottomBar='true' containerStyle={{ paddingHorizontal: 15 }} />
        <ItemHead title='生涯十二讲' seeAll='true' />
        <Item lists={listItems} />
      </View>
    )
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 5
    axios.get(api.getArticleFile, {
      params: {
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      // alert(JSON.stringify(err))
      abortFetch()
    })
  }
  renderItem = (item, index, separator) => {
    return (
      <View paddingH-15 marginB-20 >
        <ItemHead title='学业能力' leftIcon='true' />
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={{ uri: imageResize(item.image, 500) }} style={{ width: '100%', height: 115, borderRadius: 8 }} />
          <View paddingV-10>
            <Text text-18 dark>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { bannerData } = this.props.homeStore
    return (
      <View flex>
        {/* <NoNetwork refresh={this.refresh} /> */}
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
          emptyView={() => <View flex center><Text dark06>暂时没有内容</Text></View>}
        />

      </View>
    )
  }
}

export default PlaneIndex
