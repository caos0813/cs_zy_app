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
import { api, axios, OpenUrl, dialog, Toast, storage, statusBarHeight, platform, ratio, formatDate } from '../utils'
import { colors } from '../theme'
import { ItemHead, HomeBanner, SplashSwiper, NoNetwork, HomeSearch, Item } from '../components'
import { Player } from '../../react-native-root-ui'
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
      <View style={{ backgroundColor: 'transparent' }}>
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
            <Image assetName='icon06' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>志愿问答</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryZhiyuan}>
            <Image assetName='icon07' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>高考咨询</Text>
          </TouchableOpacity>
          <View style={styles.iconButton}>
            <Image assetName='icon07' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>升学课堂</Text>
          </View>
        </View>
      </View>
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
    listItems.map((item, index) => {
      item.time = this.transferTime(item.time)
      // alert(1544757590)
    })
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        {showSplash && <SplashSwiper close={this.hideSplash} animationConfig={animationConfig} />}
        <NoNetwork refresh={this.refresh} />
        {!showSplash && this.renderHeader()}
        {!showSplash &&
          <ScrollView>
            {this.renderContainer(bannerData)}
            <ItemHead title='志愿技巧' seeAll='true' />
            <Item lists={listItems} />
            <ItemHead title='省内高考政策' seeAll='true' />
            <View paddingH-15 style={{
              borderBottomWidth: 1 / ratio,
              borderColor: colors.gray
            }} >
              {
                listItems.map((item, index) => (
                  <TouchableOpacity style={styles.item} activeOpacity={0.6} key={index}>
                    <Card borderRadius={0} enableShadow={false} style={{ backgroundColor: colors.light }}>
                      <Card.Item>
                        <View paddingV-10>
                          {/* <View row style={{ width: '100%', justifyContent: 'flex-start' }}> */}
                          <Text text-16 dark >{item.text}</Text>
                          {/* </View> */}
                          <View row style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Text text-11 gray>{item.time}</Text>
                          </View>
                        </View>
                      </Card.Item>
                    </Card>
                  </TouchableOpacity>
                ))
              }
            </View>
            <ItemHead title='政策解读' seeAll='true' />
            <Item lists={listItems} />
          </ScrollView>}
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
  item: {
    // paddingHorizontal: 10
    borderTopWidth: 1 / ratio,
    borderColor: colors.gray
  }
})
export default Home
