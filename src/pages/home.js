import React, { Component } from 'react'
import { View, Text, Avatar, Assets, TextInput, Image, TouchableOpacity, Card, LoaderScreen } from 'react-native-ui-lib'
import JPushModule from 'jpush-react-native'
import { inject, observer } from 'mobx-react/native'
// import * as WeChat from 'react-native-wechat'
import SplashScreen from 'react-native-splash-screen'
import { UltimateListView } from 'react-native-ultimate-listview'
import {
  StyleSheet,
  StatusBar,
  Animated,
  Easing
} from 'react-native'
// import { RNCamera } from 'react-native-camera'
import codePush from 'react-native-code-push'
import Swiper from 'react-native-swiper'
import { storage, api, axios, imageResize, ratio, statusBarHeight, OpenUrl } from '../utils'
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
    this.state = {
      camera: false,
      headerAnimate: new Animated.Value(0)
    }
  }
  setShow = () => {
    this.setState({
      camera: true
    })
  }
  update = () => {
    codePush.sync({
      /* updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '检查到更新',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '确定'
      }, */
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
    })
  }
  takePicture = async () => {
    const options = { quality: 0.5, base64: true }
    const data = await this.refs.camera.takePictureAsync(options)
    alert(data.uri)
  }
  renderHeader = () => {
    return (
      <View>
        <View style={{ height: 250 }} >
          <Swiper height={250} style={styles.swiper}
            paginationStyle={{
              bottom: 13
            }}
            dot={<View style={{ backgroundColor: 'rgba(255,255,255,.3)', width: 5, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
            activeDot={<View style={{ backgroundColor: '#fff', width: 25, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}

          >
            <View >
              <Image assetName='banner' resizeMode='cover' style={styles.bannerImg} />
            </View>
            <View >
              <Image assetName='banner' resizeMode='cover' style={styles.bannerImg} />
            </View>
            <View >
              <Image assetName='banner' resizeMode='cover' style={styles.bannerImg} />
            </View>
          </Swiper>
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
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} >
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>填志愿</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6} onPress={() => this.openUrl(`holland-entry`, {}, true)}>
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
      // alert(JSON.stringify(err))
      abortFetch()
    })
  }
  onScroll = (e) => {
    const { setValue } = this.props.homeStore
    const posY = e.nativeEvent.contentOffset.y
    if (posY > 150) {
      setValue('barStyle', 'dark-content')
      Animated.timing(
        this.state.headerAnimate,
        {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start()
      setValue('headerOpacity', true)
    } else {
      Animated.timing(
        this.state.headerAnimate,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start()
      setValue('headerOpacity', false)
      setValue('barStyle', 'light-content')
    }
  }
  renderItem = (item, index, separator) => {
    return (
      <Card borderRadius={8} style={{ marginBottom: 10, marginLeft: 15, marginRight: 15 }} onPress={() => this.openUrl(`article`, { id: item.id }, false)}>
        <Card.Image height={110} imageSource={{ uri: imageResize(item.image, 500) }} width='100%' />
        <Card.Section body >
          <Card.Section >
            <Text text-18 dark>{item.name}</Text>
          </Card.Section>
          <Card.Section style={{ marginBottom: 0 }}>
            <Text text-14 dark06 numberOfLines={1}>现在好像没有描述</Text>
          </Card.Section>
        </Card.Section>
      </Card>
    )
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  render () {
    const { barStyle, headerOpacity } = this.props.homeStore
    return (
      <View flex useSafeArea>
        <StatusBar translucent backgroundColor='rgba(0,0,0,0)' animated barStyle={barStyle} />
        <View centerV paddingH-15 style={[styles.header, headerOpacity && styles.headerBottom]} >
          <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={Assets.icons.headIcon} backgroundColor='transparent'
            onPress={() => this.props.navigation.navigate('Login')}
            imageProps={{ tintColor: headerOpacity ? colors.dark09 : colors.light }}
          />
          <TouchableOpacity style={[styles.searchInput, headerOpacity && styles.searchInputBorder]} activeOpacity={0.6} onPress={() => this.openUrl(`search`, {}, false)}>
            <Image assetName='searchIcon' style={styles.searchIcon} />
            <TextInput hideUnderline a text-14 dark06 placeholder='搜索一下' containerStyle={{ paddingHorizontal: 48, height: 32 }} style={{ paddingTop: 2 }} editable={false} />
          </TouchableOpacity>
          <Animated.View style={[styles.headerBg, { opacity: this.state.headerAnimate }]}></Animated.View>
        </View>
        <UltimateListView keyExtractor={(item, index) => `${index} - ${item}`}
          header={this.renderHeader}
          onFetch={this.onFetch}
          item={this.renderItem}
          refreshable={false}
          allLoadedText='--我是有底线的--'
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          paginationFetchingView={() => <LoaderScreen loaderColor={colors.positive} message='正在加载...' />}
        />
      </View>
    )
  }
  async componentDidMount () {
    const { setUserInfo, getUserInfo } = this.props.userStore
    storage.load({
      key: 'userInfo'
    }).then(data => {
      setUserInfo(data)
      getUserInfo()
    }).catch(() => {
      //  setUserInfo({})
    })
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
    this.update()
    JPushModule.initPush()
    //  getUserInfo()
  }
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 5,
    zIndex: 2
  },
  headerBottom: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1 / ratio
  },
  headerBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.light,
    zIndex: 0
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
    flex: 1,
    marginLeft: 16,
    zIndex: 1
  },
  searchInputBorder: {
    borderColor: colors.gray,
    borderWidth: 1 / ratio
  },
  searchIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: 8,
    left: 15
  },
  swiper: {
    backgroundColor: '#111'
  },
  bannerImg: {
    width: '100%'
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
