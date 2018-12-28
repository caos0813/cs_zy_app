import React, { Component } from 'react'
import { StyleSheet, findNodeHandle, DeviceEventEmitter, ScrollView } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { width, statusBarHeight, transferTime, navigator, transferPlayerTime, api, axios, imageResize } from '../utils'
import { Header, NewsFooter } from '../components'
import { Player, Share } from '../../react-native-root-ui'
import _ from 'lodash'
import Config from '../config'
configure({
  enforceActions: 'always'
})
@inject('routeStore')
@observer class Play extends Component {
  @observable duration = '00:00'
  @observable toDetail = false
  @observable position = '00:00'
  @observable currentTime = 0
  @observable paused = true
  @observable data = {
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor (props) {
    super(props)
    this.state = { viewRef: null }
  }
  imageLoaded= () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  play = () => {
    Player.player && Player.pause()
  }
  statistics=(type) => {
    axios.post(api.addNumber, {
      articleInfoId: this.data.id,
      type: type
    })
  }
  footerFunc= async (e) => {
    let copyData = _.clone(this.data)
    const webpageUrl = `${Config.WEB_URL.split('#')[0]}?platform=0#/article?id=${this.data.id}`
    switch (e) {
      case 'detail':
        this.setValue('toDetail', true)
        navigator.replace('NewsDetail', { articleId: this.data.id })
        break
      case 'share':
        Share.show({
          thumbImage: this.data.picture,
          description: '',
          title: this.data.title,
          webpageUrl,
          shareCallback: () => {
            this.statistics(3)
          }
        })
        break
      case 'attention':
        axios.post(api.changePraiseState, { articleInfoId: this.data.id }).then(data => {
          copyData.isPrise = !copyData.isPrise
          this.setValue('data', copyData)
        })
        break
      case 'star':
        axios.post(api.changePraiseCollect, { articleInfoId: this.data.id }).then(data => {
          copyData.isCollect = !copyData.isCollect
          this.setValue('data', copyData)
        })
        break
      case 'comment':
        const { setValue } = this.props.routeStore
        setValue('commentTabId', this.data.id)
        navigator.replace('Comment')
        break
    }
  }
  render () {
    const { data, duration, position, paused } = this
    return (
      <View flex useSafeArea>
        <ScrollView style={styles.scroll}>
          <View style={styles.imageWrap} centerH>
            <Header
              containerStyle={styles.header}
              showLeft={false}
              showRight={false}
              titleContainer={<TouchableOpacity activeOpacity={0.6} onPress={this.goBack}>
                <Image assetName='playerArrowDown' tintColor={colors.light} />
              </TouchableOpacity>}
            />
            <Image
              style={styles.imageBlur}
              ref={(img) => { this.backgroundImage = img }}
              source={{ uri: data.picture }}
              onLoadEnd={this.imageLoaded}
            />
            {this.state.viewRef && data.picture &&
              <BlurView
                style={styles.blur}
                viewRef={this.state.viewRef}
                blurAmount={100}
                overlayColor='transparent'
                downsampleFactor={10}
              />
            }
            <Image
              style={styles.image}
              source={{ uri: imageResize(data.picture, 600) }}
            />
            <View style={[styles.progress]}>
              <Text light text-9>{position}/{duration}</Text>
            </View>
          </View>
          <View center paddingT-50 paddingB-24>
            <Text text-24 dark marginB-20>{data.title}</Text>
            <Text text-14 dark06 dark marginB-20>{transferTime(data.releaseTime)}</Text>
            <TouchableOpacity onPress={this.play}>
              <Image assetName={paused ? 'playerPlayBig' : 'playerPausedBig'} tintColor={colors.dark} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NewsFooter
          showLink
          isCollect={data.isCollect}
          isPrise={data.isPrise}
          commentNumber={data.commentNumber}
          showCollect
          onPress={this.footerFunc}
        />
      </View>
    )
  }
  goBack=() => {
    navigator.goBack()
  }
  componentWillUnmount () {
    if (!this.toDetail) {
      Player.player && Player.setStatus(true)
    }
    this.playerEvent.remove()
  }
  componentDidMount () {
    Player.player && Player.setStatus(false)
    this.playerEvent = DeviceEventEmitter.addListener('playerEvent', e => {
      console.log(e)
      const { duration, currentTime, paused } = e
      const { setValue, data } = this
      setValue('paused', paused)
      if (_.isEmpty(data)) {
        axios.get(api.queryArticleInfoDetails, {
          params: {
            articleInfoId: e.id
          }
        }).then(data => {
          setValue('data', data)
        })
      }
      setValue('position', transferPlayerTime(currentTime))
      setValue('duration', transferPlayerTime(duration))
    })
  }
}
export default Play
const styles = StyleSheet.create({
  progress: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    bottom: -6,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 12
  },
  scroll: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    zIndex: 10
  },
  blur: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0
  },
  image: {
    position: 'absolute',
    width: 281,
    height: 281,
    bottom: 47,
    borderRadius: 10
  },
  imageBlur: {
    width: width,
    height: 425 + statusBarHeight,
    opacity: 0
  }
})
