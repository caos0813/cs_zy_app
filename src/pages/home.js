import React, { Component } from 'react'
import { View, Text, Avatar, Assets, TextInput, Image, TouchableOpacity, Card, LoaderScreen } from 'react-native-ui-lib'
import JPushModule from 'jpush-react-native'
// import * as WeChat from 'react-native-wechat'
import SplashScreen from 'react-native-splash-screen'
import { UltimateListView } from 'react-native-ultimate-listview'
import {
  StyleSheet,
  StatusBar,
  Animated
} from 'react-native'
// import { RNCamera } from 'react-native-camera'
import codePush from 'react-native-code-push'
import Swiper from 'react-native-swiper'
import { storage, api, axios, imageResize } from '../utils'
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
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: false,
      barStyle: 'light-content',
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
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '检查到更新',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '确定'
      },
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
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            <Image assetName='icon01' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查大学</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            <Image assetName='icon02' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查专业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            <Image assetName='icon03' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>查职业</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            <Image assetName='icon04' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>填志愿</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            <Image assetName='icon05' style={styles.iconButtonImage} />
            <Text text-14 dark06 marginT-2>测一测</Text>
          </TouchableOpacity>
        </View>
        <ItemHead title='热门专题' />
      </View>
    )
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    /* try {
      let pageLimit = 5
      let rowData = [1, 2, 3, 4, 5]
      console.log(rowData)
      if (page === 3) {
        rowData = []
      }
      startFetch(rowData, pageLimit)
    } catch (err) {
      abortFetch()
    } */
    const pageSize = 5
    axios.get(api.getArticleFile, {
      params: {
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      abortFetch()
    })
  }
  onScroll = (e) => {
    const posY = e.nativeEvent.contentOffset.y
    if (posY <= 110) {
      this.setState({
        barStyle: 'light-content'
      })
      Animated.timing(
        this.state.headerAnimate,
        {
          toValue: posY / 100,
          duration: 100
        }
      ).start()
    } else {
      this.setState({
        barStyle: 'dark-content'
      })
    }
  }
  renderItem = (item, index, separator) => {
    return (
      <Card marginB-10 marginH-15>
        <Card.Image height={130} imageSource={{ uri: imageResize(item.image, 500) }} width='100%' />
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
  render () {
    const range = this.state.headerAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
    })
    return (
      <View flex useSafeArea>
        <StatusBar translucent backgroundColor='rgba(0,0,0,0)' animated barStyle={this.state.barStyle} />
        <Animated.View centerV paddingH-15 style={[styles.header, { backgroundColor: range }]} >
          <Avatar containerStyle={styles.avatar} imageStyle={{ width: 28, height: 28 }} imageSource={Assets.icons.headIcon} backgroundColor='transparent' />
          <TouchableOpacity style={[styles.searchInput]} activeOpacity={0.6}>
            <Image assetName='searchIcon' style={styles.searchIcon} />
            <TextInput hideUnderline text-14 dark06 placeholder='清华大学' containerStyle={{ paddingHorizontal: 48, height: 32 }} style={{ paddingTop: 2 }} editable={false} />
          </TouchableOpacity>
        </Animated.View>
        <UltimateListView keyExtractor={(item, index) => `${index} - ${item}`}
          header={this.renderHeader}
          onFetch={this.onFetch}
          item={this.renderItem}
          refreshable={false}
          allLoadedText='--我是有底线的--'
          onScroll={this.onScroll}
          paginationFetchingView={() => <LoaderScreen loaderColor={colors.positive} message='正在加载...' />}
        />
      </View>
    )
  }
  async componentDidMount () {
    storage.load({
      key: 'userInfo'
    }).then(data => {
      alert(data)
    }).catch(() => {
      /* dialog.confirm('您还没有登录，请先登录。').then(res => {
        navigate('Login')
      }) */
    })
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
    this.update()
    JPushModule.initPush()
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: 24,
    paddingHorizontal: 15,
    paddingBottom: 5,
    zIndex: 2
  },
  avatar: {
    width: 28,
    height: 28
  },
  searchInput: {
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.light,
    flex: 1,
    marginLeft: 16
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
