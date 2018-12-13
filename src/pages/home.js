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
  Linking,
  ScrollView
} from 'react-native'
import { api, axios, imageResize, OpenUrl, dialog, Toast, storage, statusBarHeight, platform } from '../utils'
import { colors } from '../theme'
import { ItemHead, HomeBanner, SplashSwiper, NoNetwork, HomeSearch } from '../components'

@inject('homeStore', 'userStore')
@observer class Home extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      bannerActiveIndex: 0,
      animationConfig: {}
    }
  }
  bannerPress = (item) => {
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    } else {
      this.openUrl(`article`, { id: item.id, type: 'banner' })
    }
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
  renderHeader = () => {
    return (
      <View centerV paddingH-15 style={[styles.header]} >
        <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
      </View>
    )
  }
  renderBadge = () => {
    const { userInfo } = this.props.userStore
    const { level, isValid, token } = userInfo
    if (token) {
      if (!level || (level === 'EXPERIENCE' && isValid)) {
        return (
          <View bg-assertive paddingH-6 paddingV-2 borderRadius={8} style={{ position: 'absolute', top: -5, right: -5 }}>
            <Text light text-12>免费体验</Text>
          </View>
        )
      } else if ((level === 'ZHI_YUAN' || level === 'FULL_FEATURED') && isValid) {
        return (
          <View bg-assertive paddingH-6 paddingV-2 borderRadius={10} style={{ position: 'absolute', top: -5, right: -5 }}>
            <Text light text-12>VIP</Text>
          </View>
        )
      }
    }
    return null
  }
  renderContainer = (bannerData) => {
    const banner = bannerData.map(item => {
      return item
    })
    return (
      <View>
        <View style={{ height: 165 }} paddingT-10 paddingB-5>
          {banner.length > 0 && <HomeBanner data={banner} itemPress={(e) => this.bannerPress(e)} />}
        </View>
        <View row marginV-5 style={styles.iconWrap}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={() => this.openUrl(`school-list`, {}, true)}>
            <Image assetName='icon01' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查大学</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={() => this.openUrl(`major-index`, {}, true)}>
            <Image assetName='icon02' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查专业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={() => this.openUrl(`profession-list`, {}, true)}>
            <Image assetName='icon03' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查职业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryHolland}>
            <Image assetName='icon05' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>测一测</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryZhiyuan}>
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>填志愿</Text>
            {this.renderBadge()}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryZhiyuan}>
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>志愿问答</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryZhiyuan}>
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>高考咨询</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
    const listItems = [{
      title: '最科学的填报志愿方法',
      text: '50位专家共同参与设计的科学填报法，为你定制最佳的志愿方案。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem01'
    }, {
      title: '最精准的数据支撑',
      text: '院校、专业录取数据、招生计划与考试院同步更新。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem02'
    }, {
      title: '最专业的生涯顾问服务',
      text: '生涯规划专家、教育专家、高级教师实时指导，为学生提供精准定制服务，辅助生涯规划决策。根据你的高考分数推荐最合适的大学及专业',
      img: 'payitem03'
    }, {
      title: '最智能的生涯测评',
      text: '为你提供最全面、最客观的”专业“评价，让你更多元、更深入的了解专业。',
      img: 'payitem04'
    }, {
      title: '最全面的大学、专业、职业库',
      text: '生动、形象的介绍，让你更多元、更深入地了解大学、专业、职业。',
      img: 'payitem05'
    }, {
      title: '最实用的生涯规划课程',
      text: '帮助学生探索自我和外部变化的环境，找到人生努力的方向，最大化实现自我价值。',
      img: 'payitem06'
    }]
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        {showSplash && <SplashSwiper close={this.hideSplash} animationConfig={animationConfig} />}
        {this.renderHeader()}
        <NoNetwork refresh={this.refresh} />
        <ScrollView>
          {this.renderContainer(bannerData)}
          <ItemHead title='志愿技巧' />
          <ScrollView horizontal style={{ paddingHorizontal: 15, width: 300 }}>
            {listItems.map((item, index) => (
              <TouchableOpacity style={{ marginRight: 20 }} key={index} activeOpacity={0.6}>
                <View row>
                  <View style={styles.scrollWap}>
                    <Image style={styles.scrollImg} assetName={item.img} />
                    <Text style={styles.scrollTime} text-12 light>3:32</Text>
                  </View>
                  <View style={styles.description} row>
                    <Text text-16 dark marginB-5>{item.title}</Text>
                    <Text numberOfLines={2} text-12 gray>{item.text}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ItemHead title='省内高考政策' />
        </ScrollView>
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
    axios.get(api.banner).then(data => {
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
  iconButtonImage: {
    /* width: 50,
    height: 50 */
  },
  scrollWap: {
    position: 'relative',
    width: 112,
    height: 85,
    marginRight: 15
  },
  scrollImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  scrollTime: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    textShadowColor: colors.black01,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, hegith: 4 }
  },
  description: {
    width: 157,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
})
export default Home
