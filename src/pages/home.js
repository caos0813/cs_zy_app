import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, LoaderScreen, Card } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
// import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
import SplashScreen from 'react-native-splash-screen'
import _ from 'lodash'
import {
  StyleSheet,
  StatusBar,
  Linking
} from 'react-native'
import { api, axios, OpenUrl, dialog, Toast, storage, statusBarHeight, platform, ratio, transferTime, getUrlParams, navigator, formatVersion } from '../utils'
import { colors } from '../theme'
import { ItemHead, HomeBanner, NoNetwork, HomeSearch, CardItem, IconCeil } from '../components'
import { SplashSwiper } from '../../react-native-root-ui'
import { UltimateListView } from 'react-native-ultimate-listview'
import { configure, observable, action } from 'mobx'
import DeviceInfo from 'react-native-device-info'
import EnvConfig from 'react-native-config'
import Config from '../config'

configure({
  enforceActions: 'always'
})
@inject('userStore')
@observer class Home extends Component {
  @observable bannerData = []
  @observable firstArticle = {}
  @observable firstTopic = []
  @observable topics = []
  @observable specials = []
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      // bannerActiveIndex: 0,
      animationConfig: {}
    }
  }
  /* static navigationOptions = ({ navigation, screenProps }) => {
    const { getParam } = navigation
    console.log(getParam('showSplash'))
    // 启动页加载完以后再显示底部的tabNav
    let tabBarVisible
    if (getParam('showSplash') === 'show') {
      tabBarVisible = false
    } else if (getParam('showSplash') === 'hide') {
      tabBarVisible = true
    }
    return {
      tabBarVisible
    }
  } */
  bannerPress = (item) => {
    if (item.articleInfoId) {
      this.openNative('NewsDetail', { articleId: item.articleInfoId })
    } else {
      this.openNative('NewsDetail', { articleId: item.id, type: 'banner' })
    }

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
      return
    } else if (!startYear) {
      navigate('Info', {
        type: 'complete'
      })
      return
    }
    if (userInfo.isSuperUser) {
      this.openUrl(`volunteer-index`)
      return
    }
    if (!level) {
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

    let userInfo = null
    try {
      userInfo = await storage.load({
        key: 'userInfo'
      })
    } catch (err) {

    }
    let provinceId = (userInfo && userInfo.province) ? userInfo.province.id : 430000
    axios.get(api.queryModuleArticleInfo, {
      params: {
        moduleId: 4,
        provinceId: provinceId,
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      console.log('onFetch3')
      const { articleInfoLabelList, topicsAndArticlesList, provincePolicyList } = data
      if (page === 1) {
        if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
          this.setValue('firstArticle', articleInfoLabelList.content[0])
        } else {
          this.setValue('firstArticle', [])
        }
        if (topicsAndArticlesList.length > 0) {
          let firstTopic = []
          firstTopic.push(topicsAndArticlesList.shift())
          this.setValue('firstTopic', firstTopic)
          this.setValue('topics', topicsAndArticlesList)
        } else {
          this.setValue('firstTopic', [])
          this.setValue('topics', [])
        }
        if (provincePolicyList.content.length > 0) {
          this.setValue('specials', provincePolicyList.content)
        } else {
          this.setValue('specials', [])
        }
      }
      if (articleInfoLabelList.content && articleInfoLabelList.content.length > 0) {
        if (articleInfoLabelList.content.length === 1 && page <= 1) {
          console.log('只有一个，在第一页，所以删除一个')
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
        href: 'ByProfession'
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
        image: require('../assets/home/icon06.png'),
        href: 'VolunteerAnswer'
      }, {
        title: '高考咨询',
        image: require('../assets/home/icon07.png'),
        href: 'Seek'
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
    // alert(JSON.stringify(this.firstArticle))
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
        {this.firstArticle.labelName && <View>
          <ItemHead title={this.firstArticle.labelName} leftIcon='true' smallText='true' />
          <View paddingH-15>
            <CardItem onPress={() => { navigator.push('NewsDetail', { articleId: this.firstArticle.id }) }} title={this.firstArticle.title} imageSource={{ uri: this.firstArticle.picture }} desc={this.firstArticle.introduction} fileType={this.firstArticle.fileType} imageStyle={{ height: 115 }}>
              <View style={styles.cardFooter} paddingT-5>
                <View row>
                  <View row centerV paddingR-10>
                    <Image assetName='attention' style={styles.cardItemImage} />
                    <Text gray text-11>{this.firstArticle.priseNumber}</Text>
                  </View>
                  <View row centerV>
                    <Image assetName='comment' style={styles.cardItemImage} />
                    <Text gray text-11>{this.firstArticle.commentNumber}</Text>
                  </View>
                </View>
                <Text gray text-11>{transferTime(this.firstArticle.releaseTime)}</Text>
              </View>
            </CardItem>
          </View>
        </View>}
        {/* 专题1 */}
        {this.renderTopics(this.firstTopic)}
        {/* 所有特殊专题 */}
        {
          this.specials.length > 0 &&
          <View paddingT-10>
            <ItemHead title='省内高考政策' seeAll='true' onPress={() => this.openNative('CommonList', { type: 2, title: '省内高考政策' })} />
          </View>
        }
        {this.renderSpecial(this.specials)}
        {/* 剩余专题 */}
        {this.renderTopics(this.topics)}
      </View>
    )
  }
  openNotificationListener = (e) => {
    const extras = _.isObject(e.extras) ? e.extras : JSON.parse(e.extras)
    if (extras.type === 'article') {
      this.openUrl(`article`, { id: extras.id })
    } else if (extras.type === 'banner') {
      if (extras.link) {
        Linking.openURL(extras.link).catch(err => console.error('An error occurred', err))
      } else {
        this.openUrl(`article`, { id: extras.id, type: 'banner' })
      }
    } else {
      return false
    }
  }
  // 专题
  renderTopics = (topicData) => {
    return (
      topicData.map((item, index) => (
        <View key={index}>
          <View paddingT-10>
            <ItemHead onPress={() => navigator.push('CommonList', { type: 1, specialTopicInfoId: item.id, title: item.title })} title={item.title} seeAll='true' />
          </View>
          <View row style={[styles.topics]}>
            {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
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
                  <Text text-11 gray>{transferTime(item.createTime)}</Text>
                </View>
              </View>
            </Card.Item>
          </Card>
        </TouchableOpacity>
      ))
    )
  }
  openNotificationListener = (e) => {
    /* alert(JSON.stringify(e)) */
    const extras = JSON.parse(e.extras)
    console.log(extras)
    if (extras.articleInfoId) {
      this.openNative('NewsDetail', { articleId: extras.articleInfoId })
    } else {
      this.openNative('NewsDetail', { articleId: extras.id, type: 'banner' })
    }
  }
  render () {
    const { bannerData } = this
    // const { animationConfig } = this.state
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        {/* <SplashSwiper close={this.hideSplash} animationConfig={animationConfig} /> */}
        <NoNetwork refresh={this.refresh} />
        {this.renderHeader()}
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
      </View >
    )
  }
  refresh = () => {
    const { state, replace } = this.props.navigation
    replace(state)
    /*
    this.refs.scroll.refresh()
    axios.get(api.banner).then(data => {
      setValue('bannerData', data.content)
    }) */
  }
  componentDidMount () {
    const { navigate } = this.props.navigation
    axios.get(api.queryHomePageBannerInfo, { params: { moduleId: 4 } }).then(data => {
      this.setValue('bannerData', data.content)
    })

    storage.load({
      key: 'showSplash'
    }).then(data => {
    }).catch(() => {
      SplashSwiper.init({
        callback: () => {
          this.hideSplash()
        }
      })
    }).finally(() => {
      setTimeout(() => {
        SplashScreen.hide()
        this.setValue('showSplash', true)
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
    Linking.getInitialURL().then((url) => {
      if (url) {
        const { id } = getUrlParams(url)
        setTimeout(() => {
          navigate('NewsDetail', { articleId: id })
        }, 200)
      }
    })
    axios.get(api.checkVersion, {
      params: {
        productId: 3,
        platform,
        isProduction: EnvConfig.ENV === 'production'
      }
    }).then(data => {
      const nowVersion = formatVersion(DeviceInfo.getVersion())
      const newVersion = formatVersion(data.version)
      if (nowVersion < newVersion) {
        dialog.confirm('检查到新版本，是否升级？').then(() => {
          const downloadUrl = `${Config.WEB_URL.split('#')[0]}?platform=0#/download`
          Linking.openURL(downloadUrl)
        })
      }
    })
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
    tintColor: colors.gray
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  one: {
    width: '100%'
  }
})
export default Home
