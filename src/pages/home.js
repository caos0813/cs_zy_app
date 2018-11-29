import React, { Component } from 'react'
import { View, Text, Avatar, Assets, TextInput, Image, TouchableOpacity, LoaderScreen } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
// import * as WeChat from 'react-native-wechat'
import JPushModule from 'jpush-react-native'
import { UltimateListView } from 'react-native-ultimate-listview'
import SplashScreen from 'react-native-splash-screen'
import { BoxShadow } from 'react-native-shadow'
import _ from 'lodash'
import {
  StyleSheet,
  StatusBar,
  Linking
} from 'react-native'
import { api, axios, imageResize, OpenUrl, width, dialog, Toast, storage, imageFormat, statusBarHeight } from '../utils'
import { colors } from '../theme'
import { ItemHead, HomeBanner, SplashSwiper, NoNetwork } from '../components'

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
    const { userInfo } = this.props.userStore
    const shadowOpt = {
      width: width - 73,
      height: 30,
      color: '#000',
      border: 15,
      radius: 15,
      opacity: 0.05,
      x: 0,
      y: 0,
      style: {
        marginLeft: 15
      }
    }
    return (
      <View centerV paddingH-15 style={[styles.header]} >
        {!userInfo.token
          ? <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={Assets.icons.headIcon} backgroundColor='transparent'
            onPress={() => this.openNative('Login', {}, false)}
            imageProps={{ tintColor: colors.grey }}
          />
          : <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={imageFormat(userInfo.image, userInfo.gender)}
            backgroundColor={userInfo.image ? 'transparent' : colors.stable}
            onPress={() => this.openNative('Mine', {}, true)}
          />
        }
        <BoxShadow setting={shadowOpt}>
          <TouchableOpacity style={[styles.searchInput]} activeOpacity={0.6} onPress={() => this.openUrl(`search`, {}, false)}>
            <Image assetName='searchIcon' style={styles.searchIcon} tintColor={colors.dark} />
            <TextInput hideUnderline a text-14 dark06 placeholder='搜索一下' containerStyle={{ paddingHorizontal: 48, height: 30 }} style={{ paddingTop: 2 }} editable={false} />
          </TouchableOpacity>
        </BoxShadow>
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
        <View row marginV-10>
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
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryZhiyuan}>
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>填志愿</Text>
            {this.renderBadge()}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryHolland}>
            <Image assetName='icon05' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>测一测</Text>
          </TouchableOpacity>
        </View>
        <ItemHead title='升学指导' />
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
  renderItem = (item, index, separator) => {
    return (
      <View paddingH-15 marginB-20 >
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.openUrl(`article`, { id: item.id }, false)}>
          <Image source={{ uri: imageResize(item.image, 500) }} style={{ width: '100%', height: 115, borderRadius: 8 }} />
          <View paddingV-10>
            <Text text-18 dark>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      // <Card borderRadius={8} style={{ marginBottom: 10, marginLeft: 15, marginRight: 15 }} onPress={() => this.openUrl(`article`, { id: item.id }, false)}>
      //   <Card.Image height={110} imageSource={{ uri: imageResize(item.image, 500) }} width='100%' />
      //   <Card.Section body >
      //     <Card.Section >
      //       <Text text-18 dark>{item.name}</Text>
      //     </Card.Section>
      //     {/*  <Card.Section style={{ marginBottom: 0 }}>
      //       <Text text-14 dark06 numberOfLines={1}>现在好像没有描述</Text>
      //     </Card.Section> */}
      //   </Card.Section>
      // </Card>
    )
  }
  render () {
    const { showSplash, bannerData } = this.props.homeStore
    const { animationConfig } = this.state
    return (
      <View flex useSafeArea>
        <StatusBar animated backgroundColor='transparent' barStyle='dark-content' translucent />
        {showSplash && <SplashSwiper close={this.hideSplash} animationConfig={animationConfig} />}
        {this.renderHeader()}
        <NoNetwork refresh={this.refresh} />
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
    JPushModule.notifyJSDidLoad(e => {
      // alert(JSON.stringify(e))
    })
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
    paddingHorizontal: 15,
    paddingBottom: 5,
    zIndex: 2
  },
  avatar: {
    width: 28,
    height: 28,
    marginTop: 1,
    zIndex: 1
  },
  searchInput: {
    borderRadius: 20,
    backgroundColor: colors.light,
    flex: 1,
    zIndex: 1
  },
  searchInputBorder: {
    elevation: 30
  },
  searchIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: 8,
    left: 15
  },
  iconButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtonImage: {
    /* width: 50,
    height: 50 */
  }
})
export default Home
