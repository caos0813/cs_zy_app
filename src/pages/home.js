import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, LoaderScreen, Card } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
// import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
// import { UltimateListView } from 'react-native-ultimate-listview'
import SplashScreen from 'react-native-splash-screen'
import _ from 'lodash'
import {
  StyleSheet,
  StatusBar,
  Linking
} from 'react-native'
import { api, axios, OpenUrl, dialog, Toast, storage, statusBarHeight, platform, ratio, formatDate } from '../utils'
import { colors } from '../theme'
import { ItemHead, HomeBanner, SplashSwiper, NoNetwork, HomeSearch, CardItem, IconCeil } from '../components'
import { Player } from '../../react-native-root-ui'
import { UltimateListView } from 'react-native-ultimate-listview'
// import { stringify } from 'querystring'
@inject('homeStore', 'userStore')
@observer class Home extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      bannerActiveIndex: 0,
      animationConfig: {},
      articles: []
    }
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    // 启动页加载完以后再显示底部的tabNav
    let tabBarVisible
    if (screenProps.showSplash) {
      tabBarVisible = false
    } else {
      tabBarVisible = true
    }
    return {
      tabBarVisible
    }
  }
  bannerPress = (item) => {
    this.openNative('NewsDetail', { articleId: item.id })
    // if (item.link) {
    //   Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    // } else {
    //   this.openUrl(`article`, { id: item.id, type: 'banner' })
    // }
  }

  entryZhiyuan = () => {
    // () => this.openUrl(`volunteer-index`, {}, true)
    const { setUserInfo, userInfo } = this.props.userStore
    const { phoneNumber, token, level, isValid, startYear } = userInfo
    const { navigate } = this.props.navigation
    if (!token) {
      navigate('Login')
    } else if (!startYear) {
      navigate('Info', {
        type: 'complete'
      })
    } else if (!level) {
      axios.post(api.tiralBinding, { phoneNumber }).then(data => {
        const copyUserInfo = _.clone(userInfo)
        copyUserInfo.level = 'EXPERIENCE'
        copyUserInfo.isValid = true
        setUserInfo(copyUserInfo)
        Toast('恭喜您获得3天志愿卡专属功能体验期，体验期后可在会员中心购买志愿卡', () => {
          this.openUrl(`volunteer-index`)
        })
      }).catch(err => {
        if (err.code === 2) {
          this.openUrl(`volunteer-index`)
        }
      })
    } else {
      // if(level==='ZHI_YUAN'||level==='FULL_FEATURED'||level==='EXPERIENCE')
      if (['ZHI_YUAN', 'FULL_FEATURED', 'EXPERIENCE'].indexOf(level) > -1 && isValid) {
        this.openUrl(`volunteer-index`)
      } else if (level === 'EXPERIENCE' && !isValid) {
        dialog.confirm('您的体验期已到期，进入会员中心开通志愿卡，即可继续享受志愿卡专属功能').then(() => {
          navigate('Pay')
        })
      } else {
        navigate('Pay')
      }
    }
  }
  hideSplash = () => {
    const { setValue } = this.props.homeStore
    setValue('showSplash', false)
    storage.save({
      key: 'showSplash',
      data: false
    })
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  entryHolland = () => {
    const { userInfo } = this.props.userStore
    const { isFinishTest, continues } = userInfo
    if (isFinishTest) {
      if (continues) {
        this.openUrl(`holland-entry`, {}, true)
      } else {
        this.openUrl(`report`, {}, true)
      }
    } else {
      this.openUrl(`holland-entry`, {}, true)
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
  goHref (item) {
    if (item.href) {
      if (item.isBrowser) {
        this.openUrl(item.href, {}, true)
      } else {
        this.openNative(item.href, {}, true)
      }
    }
    if (item.title === '测一测') {
      this.entryHolland()
    } else if (item.title === '填志愿') {
      this.entryZhiyuan()
    }
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 5
    const { setValue } = this.props.homeStore
    const { userInfo } = this.props.userStore
    // alert(JSON.stringify(userInfo))
    axios.get(api.queryModuleArticleInfo, {
      params: {
        moduleId: 4,
        provinceId: 430000,
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      const { articleInfoLabelList, topicsAndArticlesList, provincePolicyList } = data
      if (page === 1) {
        if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
          setValue('firstArticle', articleInfoLabelList.content[0])
        } else {
          setValue('firstArticle', [])
        }
        if (topicsAndArticlesList.length > 0) {
          let firstTopic = []
          firstTopic.push(topicsAndArticlesList.shift())
          setValue('firstTopic', firstTopic)
          setValue('topics', topicsAndArticlesList)
        } else {
          setValue('firstTopic', [])
          setValue('topics', [])
        }
        if (provincePolicyList.length > 0) {
          setValue('specials', provincePolicyList)
        } else {
          setValue('specials', [])
        }
      }
      if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
        startFetch(articleInfoLabelList.content, pageSize)
      } else {
        startFetch([], pageSize)
      }
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderHeader = () => {
    return (
      <View centerV paddingH-15 style={[styles.header]} >
        <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
      </View>
    )
  }
  renderContainer = (bannerData) => {
    const iconsList = [
      {
        title: '查大学',
        image: require('../assets/home/icon01.png'),
        href: 'ByCollege'
      }, {
        title: '查专业',
        image: require('../assets/home/icon02.png'),
        href: 'major-index',
        isBrowser: true
      }, {
        title: '查职业',
        image: require('../assets/home/icon03.png'),
        href: 'profession-list',
        isBrowser: true
      }, {
        title: '测一测',
        image: require('../assets/home/icon05.png'),
        isSpecial: true
      }, {
        title: '填志愿',
        image: require('../assets/home/icon04.png'),
        isSpecial: true
      }, {
        title: '志愿问答',
        image: require('../assets/home/icon06.png')
      }, {
        title: '高考咨询',
        image: require('../assets/home/icon07.png')
      }, {
        title: '升学课堂',
        image: require('../assets/home/icon08.png')
      }
    ]
    const banner = bannerData.map(item => {
      let obj = item
      obj.image = item.picture
      return obj
    })
    const { firstArticle, firstTopic, specials, topics } = this.props.homeStore
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <View style={{ height: 165 }} paddingT-10 paddingB-5>
          {banner.length > 0 && <HomeBanner data={banner} itemPress={(e) => this.bannerPress(e)} />}
        </View>
        <View row marginV-5 style={styles.iconWrap}>
          {
            iconsList.map((item, index) => (
              <IconCeil onPress={() => this.goHref(item)} iconButton={styles.iconButton} imageSource={item.image} title={item.title} key={index} opacity={index === (iconsList.length - 1) ? 1 : 0.6} isBadge={item.title === '填志愿' ? 'true' : 'false'} />
            ))
          }
        </View>
        {/* 文章1 */}
        {firstArticle.length > 0 && <View style={styles.article}>
          <ItemHead title={firstArticle.labelName} leftIcon='true' />
          <CardItem onPress={() => { this.openNative('NewsDetail', { articleId: firstArticle.id }) }} title={firstArticle.title} imageSource={{ uri: firstArticle.picture }} desc={firstArticle.introduction} fileType={firstArticle.fileType} imageStyle={{ height: 115 }}>
            <View style={styles.cardFooter} paddingT-5>
              <View row>
                <View row centerV paddingR-10>
                  <Image assetName='attention' style={styles.cardItemImage} />
                  <Text dark06 text-11>{firstArticle.priseNumber}</Text>
                </View>
                <View row centerV>
                  <Image assetName='comment' style={styles.cardItemImage} />
                  <Text dark06 text-11>{firstArticle.commentNumner}</Text>
                </View>
              </View>
              <Text dark06 text-11>{this.transferTime(firstArticle.releaseTime)}</Text>
            </View>
          </CardItem>
        </View>}
        {/* 专题1 */}
        {this.renderTopics(firstTopic)}
        {/* 所有特殊专题 */}
        {
          specials.length > 0 &&
          <View paddingT-10>
            <ItemHead title='省内高考政策' smallText='true' seeAll='true' onPress={() => this.openNative('CommonList', { type: 2, title: '省内高考政策' })} />
          </View>
        }
        {this.renderSpecial(specials)}
        {/* 剩余专题 */}
        {this.renderTopics(topics)}
      </View>
    )
  }
  renderItem = (item, index, separator) => {
    if (index === 0) {
      return null
    } else {
      return (
        <View style={styles.article} key={index}>
          <ItemHead title={item.labelName} leftIcon='true' />
          <CardItem onPress={() => { this.openNative('NewsDetail', { articleId: item.id }) }} title={item.title} imageSource={{ uri: item.picture }} desc={item.introduction} imageStyle={{ height: 115 }} fileType={item.fileType}>
            <View style={styles.cardFooter} paddingT-5>
              <View row>
                <View row centerV paddingR-10>
                  <Image assetName='attention' style={styles.cardItemImage} />
                  <Text dark06 text-11>{item.priseNumber}</Text>
                </View>
                <View row centerV>
                  <Image assetName='comment' style={styles.cardItemImage} />
                  <Text dark06 text-11>{item.commentNumner}</Text>
                </View>
              </View>
              <Text dark06 text-11>{this.transferTime(item.releaseTime)}</Text>
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
            <ItemHead onPress={() => this.openNative('CommonList', { type: 1, specialTopicInfoId: item.id, title: item.title })} title={item.title} smallText='true' seeAll='true' />
          </View>
          <View row style={[styles.topics]}>
            {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
              item.articleInfoBean.content.map((el, i) => (
                <View style={styles.topic} key={i}>
                  <CardItem onPress={() => { this.openNative('NewsDetail', { articleId: el.id }) }} title={el.title} imageSource={{ uri: el.picture }} desc={el.introduction} fileType={item.fileType} />
                </View>
              ))
            }
          </View >
        </View>
      ))
    )
  }
  // 特殊专题
  renderSpecial = (specials) => {
    return (
      specials.map((item, index) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.link).catch(err => console.error('An error occurred', err))} style={styles.item} activeOpacity={0.6} key={index}>
          <Card borderRadius={0} enableShadow={false} style={{ backgroundColor: colors.light }}>
            <Card.Item>
              <View paddingV-10>
                <Text text-16 dark >{item.title}</Text>
                <View row style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Text text-11 gray>{this.transferTime(item.createTime)}</Text>
                </View>
              </View>
            </Card.Item>
          </Card>
        </TouchableOpacity>
      ))
    )
  }
  testPlay = (index) => {
    if (index === 1) {
      Player.play({
        url: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/audio/article/20180831152145',
        image: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813',
        title: '学前教育'
      })
    } else {
      Player.play({
        url: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/audio/article/20180831152050',
        image: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084352',
        title: '护理学'
      })
    }
  }
  openNotificationListener = (e) => {
    /* alert(JSON.stringify(e)) */
    const extras = JSON.parse(e.extras)
    if (extras.type === 'article') {
      this.openUrl(`article`, { id: extras.id })
    } else if (extras.type === 'banner') {
      if (extras.link) {
        Linking.openURL(extras.link).catch(err => console.error('An error occurred', err))
      } else {
        this.openUrl(`article`, { id: extras.id, type: 'banner' })
      }
    }
  }
  render () {
    const { showSplash, bannerData } = this.props.homeStore
    const { animationConfig } = this.state
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        {showSplash && <SplashSwiper close={this.hideSplash} animationConfig={animationConfig} />}
        <NoNetwork refresh={this.refresh} />
        {!showSplash && this.renderHeader()}
        {!showSplash &&
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
          />
        }
      </View >
    )
  }
  refresh = () => {
    const { state, replace } = this.props.navigation
    replace(state)
    /* const { setValue } = this.props.homeStore
    this.refs.scroll.refresh()
    axios.get(api.banner).then(data => {
      setValue('bannerData', data.content)
    }) */
  }
  componentDidMount () {
    const { setValue } = this.props.homeStore
    axios.get(api.queryHomePageBannerInfo, { params: { moduleId: 4 } }).then(data => {
      setValue('bannerData', data.content)
    })
    storage.load({
      key: 'showSplash'
    }).then(data => {
      setValue('showSplash', false)
    }).catch(() => {
      setValue('showSplash', true)
    }).finally(() => {
      setTimeout(() => {
        SplashScreen.hide()
      }, 1000)
    })
    /* 监听点击推送时事件 */
    if (platform === 'android') {
      JPushModule.notifyJSDidLoad(e => {
        // alert(JSON.stringify(e))
      })
    }
    JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener)
    /* 监听点击推送时事件 */
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.light,
    paddingTop: statusBarHeight + 5,
    // paddingHorizontal: 15,
    paddingBottom: 5,
    zIndex: 2
  },
  avatar: {
    width: 28,
    height: 28,
    marginTop: 1,
    zIndex: 1
  },
  iconWrap: {
    flexWrap: 'wrap'
  },
  iconButton: {
    // flex: 1,
    width: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  item: {
    marginHorizontal: 10,
    borderTopWidth: 1 / ratio,
    borderColor: colors.gray
  },
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
  fullWidth: {
    width: '100%'
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
  }
})
export default Home
