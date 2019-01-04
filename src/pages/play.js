import React, { Component } from 'react'
import { StyleSheet, findNodeHandle, Slider, ScrollView, Platform } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Image, TouchableOpacity, Text } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { width, statusBarHeight, transferTime, navigator, api, axios, imageResize } from '../utils'
import { Header, NewsFooter } from '../components'
import { Player, Share } from '../../react-native-root-ui'
import _ from 'lodash'
import Config from '../config'
import playerStore from '../store/playerStore'
import { NavigationActions } from 'react-navigation'
configure({
  enforceActions: 'always'
})
@inject('routeStore')
@observer class Play extends Component {
  @observable data = {
  }
  @observable orgValue=0
  @observable sliderValue=0
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
    this.state = { viewRef: null, value: 0 }
  }
  imageLoaded= () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  play = () => {
    const { id, videoFile, title, picture } = this.data
    if (Player.player) {
      Player.pause()
    } else {
      Player.play({
        id: id,
        url: videoFile,
        title: title,
        image: imageResize(picture, 200)
      })
    }
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
        navigator.navigate('NewsDetail', { articleId: this.data.id })
        break
      case 'share':
        Share.show({
          thumbImage: this.data.picture,
          description: '',
          title: this.data.title,
          webpageUrl,
          shareCallback: () => {
            this.statistics(3)
            Share.close()
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
        navigator.navigate('Comment', { articleId: this.data.id },
          NavigationActions.navigate({
            routeName: 'Comment',
            params: { refresh: (e) => this.refreshComment(e) }
          })
        )
        break
    }
  }
  refreshComment=(num) => {
    let data = _.clone(this.data)
    data.commentNumber = num
    this.setValue('data', data)
  }
  onValueChange=(e) => {
    this.setValue('sliderValue', e)
  }
  render () {
    const { data } = this
    const { duration, position, paused } = playerStore
    const picture = data.picture
    return (
      <View flex >
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
              source={{ uri: picture }}
              onLoadEnd={this.imageLoaded}
            />
            {this.state.viewRef && picture &&
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
              source={{ uri: picture }}
            />
            <View style={[styles.progress]}>
              <Text light text-9>{position}</Text>
              <Slider value={this.orgValue} onValueChange={this.onValueChange} thumbTintColor={colors.light} style={{ flex: 1 }} />
              <Text light text-9>{duration}</Text>
            </View>
          </View>
          <View center paddingT-40 paddingB-24>
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
  }
  componentDidMount () {
    const id = this.props.navigation.getParam('articleId')
    axios.get(api.queryArticleInfoDetails, {
      params: {
        articleInfoId: id
      }
    }).then(data => {
      this.setValue('data', data)
    })
  }
}
export default Play
const styles = StyleSheet.create({
  progress: {
    left: 0,
    bottom: 10,
    width: '100%',
    height: 20,
    position: 'absolute',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
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
    left: 0,
    bottom: 0
  },
  image: {
    position: 'absolute',
    width: width - 100,
    height: width - 100,
    bottom: 47,
    borderRadius: 10
  },
  imageBlur: {
    width: width,
    height: width + statusBarHeight,
    opacity: 0,
    ...Platform.select({
      ios: {
        opacity: 1
      }
    })
  }
})
