import React, { Component } from 'react'
import { View, Text, Avatar, Assets, TextInput, Image, TouchableOpacity, Card, LoaderScreen } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
// import * as WeChat from 'react-native-wechat'
import { UltimateListView } from 'react-native-ultimate-listview'
import JPushModule from 'jpush-react-native'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import _ from 'lodash'
import {
  StyleSheet,
  StatusBar,
  Linking
} from 'react-native'
import Swiper from 'react-native-swiper'
import { api, axios, imageResize, ratio, statusBarHeight, OpenUrl, width, dialog, Toast } from '../utils'
import { colors } from '../theme'
import { ItemHead } from '../components'

Assets.loadAssetsGroup('icons', {
  headIcon: require('../assets/home/account.png'),
  searchIcon: require('../assets/home/ic_search_24.png'),
  banner: require('../assets/home/banner.png'),
  icon01: require('../assets/home/icon01.png'),
  icon02: require('../assets/home/icon02.png'),
  icon03: require('../assets/home/icon03.png'),
  icon04: require('../assets/home/icon04.png'),
  icon05: require('../assets/home/icon05.png')
})
@inject('homeStore', 'userStore')
@observer class Home extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
  }
  bannerPress = (item) => {
    if (item.link) {
      Linking.openURL(item.link).catch(err => console.error('An error occurred', err))
    } else {
      this.openUrl(`article`, { id: item.id, type: 'banner' })
    }
  }
  renderHeader = (animatedValue, headerLine, userInfo) => {
    return (
      <View animatedValue={animatedValue} centerV paddingH-15 style={[styles.header]} >
        {headerLine && <View style={[styles.headerLine]} />}
        {!userInfo.token
          ? <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={Assets.icons.headIcon} backgroundColor='transparent'
            onPress={() => this.openNative('Login', {
              preRefresh: this.refresh
            }, false)}
            imageProps={{ tintColor: headerLine ? colors.grey : colors.light }}
          />
          : <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={{ uri: userInfo.image }}
            backgroundColor={userInfo.image ? 'transparent' : colors.stable}
            onPress={() => this.openNative('Mine', {}, true)}
          />
        }
        <TouchableOpacity style={[styles.searchInput, styles.searchInputBorder]} activeOpacity={0.6} onPress={() => this.openUrl(`search`, {}, false)}>
          <Image assetName='searchIcon' style={styles.searchIcon} />
          <TextInput hideUnderline a text-14 dark06 placeholder='搜索一下' containerStyle={{ paddingHorizontal: 48, height: 30 }} style={{ paddingTop: 2 }} editable={false} />
        </TouchableOpacity>
      </View>
    )
  }
  renderTopContainer = (animatedValue, listData) => {
    return (
      <View style={{ height: 250 }} animatedValue={animatedValue}>
        {listData.length > 0 &&
          <Swiper height={250} style={styles.swiper}
            paginationStyle={{
              bottom: 13
            }}
            dot={<View style={{ backgroundColor: 'rgba(255,255,255,.3)', width: 5, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
            activeDot={<View style={{ backgroundColor: '#fff', width: 25, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}

          >
            {
              listData.map(item => (
                <TouchableOpacity activeOpacity={0.7} key={item.id} onPress={() => this.bannerPress(item)}>
                  <Image source={{ uri: item.image }} resizeMode='cover' style={styles.bannerImg} />
                </TouchableOpacity>
              ))
            }
          </Swiper>
        }
      </View>
    )
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
        Toast('恭喜您获得3天升学卡专属功能体验期，体验期后可在会员中心购买升学卡')
        this.openUrl(`volunteer-index`)
      })
    } else {
      // if(level==='ZHI_YUAN'||level==='FULL_FEATURED'||level==='EXPERIENCE')
      if (['ZHI_YUAN', 'FULL_FEATURED', 'EXPERIENCE'].indexOf(level) > -1 && isValid) {
        this.openUrl(`volunteer-index`)
      } else {
        dialog.confirm('您得体验期已到期，进入会员中心开通升学卡，即可继续享受升学卡专属功能').then(() => {
          navigate('Pay')
        })
      }
    }
  }
  entryHolland=() => {
    const { userInfo } = this.props.userStore
    const { isFinishTest } = userInfo
    if (isFinishTest) {
      this.openUrl(`report`, {}, true)
    } else {
      this.openUrl(`holland-entry`, {}, true)
    }
    // this.openUrl(`holland-entry`, {}, true)
  }
  renderContainer = () => {
    return (
      <View>
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={this.entryHolland}>
            <Image assetName='icon05' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>测一测</Text>
          </TouchableOpacity>
        </View>
        <ItemHead title='热门专题' />
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
      <Card borderRadius={8} style={{ marginBottom: 10, marginLeft: 15, marginRight: 15 }} onPress={() => this.openUrl(`article`, { id: item.id }, false)}>
        <Card.Image height={110} imageSource={{ uri: imageResize(item.image, 500) }} width='100%' />
        <Card.Section body >
          <Card.Section >
            <Text text-18 dark>{item.name}</Text>
          </Card.Section>
          {/*  <Card.Section style={{ marginBottom: 0 }}>
            <Text text-14 dark06 numberOfLines={1}>现在好像没有描述</Text>
          </Card.Section> */}
        </Card.Section>
      </Card>
    )
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  onHeaderFixed = (e) => {
    const { setValue } = this.props.homeStore
    if (e) {
      setValue('barStyle', 'dark-content')
      setValue('headerLine', true)
    } else {
      setValue('headerLine', false)
    }
  }
  render () {
    const { barStyle, bannerData, headerLine } = this.props.homeStore
    const { userInfo } = this.props.userStore
    return (
      <View flex useSafeArea>
        <StatusBar translucent animated barStyle={barStyle} />
        <ParallaxScroll
          renderHeader={({ animatedValue }) => this.renderHeader(animatedValue, headerLine, userInfo)}
          headerHeight={40 + statusBarHeight}
          parallaxHeight={250}
          renderParallaxForeground={({ animatedValue }) => this.renderTopContainer(animatedValue, bannerData)}
          parallaxBackgroundScrollSpeed={1}
          parallaxForegroundScrollSpeed={1.5}
          headerBackgroundColor='rgba(255, 255, 255, 0)'
          headerFixedBackgroundColor='rgba(255, 255, 255, 1)'
          onHeaderFixed={this.onHeaderFixed}
          isHeaderFixed
        >
          <UltimateListView style={{ zIndex: 20, backgroundColor: colors.light }} ref='scroll' keyExtractor={(item, index) => `${index} - ${item}`}
            header={this.renderContainer}
            onFetch={this.onFetch}
            item={this.renderItem}
            refreshable={false}

            allLoadedText='--我是有底线的--'
            // onScroll={this.onScroll}
            showsVerticalScrollIndicator={false}
            paginationFetchingView={() => <LoaderScreen loaderColor={colors.positive} message='正在加载...' />}
            emptyView={() => <View flex center><Text>暂时没有内容</Text></View>}
          />
        </ParallaxScroll>
      </View>
    )
  }
  refresh = () => {
    const { setValue } = this.props.homeStore
    axios.get(api.banner).then(data => {
      setValue('bannerData', data.content)
    })
    this.refs.scroll.refresh()
  }
  openNotificationListener = (e) => {
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
  componentDidMount () {
    const { setValue } = this.props.homeStore
    axios.get(api.banner).then(data => {
      setValue('bannerData', data.content)
    })
    /* 监听点击推送时事件 */
    JPushModule.notifyJSDidLoad(e => {
      // alert(JSON.stringify(e))
    })
    JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener)
    /* 监听点击推送时事件 */
    //  getUserInfo()
  }
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    // position: 'absolute',
    flexDirection: 'row',
    paddingTop: statusBarHeight + 5,
    paddingHorizontal: 15,
    paddingBottom: 5,
    zIndex: 2
  },
  headerLine: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 1 / ratio,
    backgroundColor: colors.grey
  },
  avatar: {
    width: 28,
    height: 28,
    marginTop: 1,
    zIndex: 1
  },
  searchInput: {
    // height: 30,
    borderRadius: 20,
    backgroundColor: colors.light,
    borderWidth: 1 / ratio,
    borderColor: colors.grey,
    flex: 1,
    marginLeft: 16,
    zIndex: 1
  },
  searchInputBorder: {
    borderWidth: 1 / ratio,
    borderColor: colors.grey
  },
  searchIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: 8,
    left: 15
  },
  swiper: {
    // backgroundColor: '#111'
  },
  bannerImg: {
    width: '100%',
    height: '100%'
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
