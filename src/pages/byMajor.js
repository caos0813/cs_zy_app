import React, { Component } from 'react'
import { StyleSheet, ScrollView, findNodeHandle } from 'react-native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { HomeSearch, IconCeil, ItemHead, CardItem } from '../components'
import { OpenUrl, axios, api, imageResize } from '../utils'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
@inject('userStore')
@observer class ByMajor extends Component {
  @observable audioList = []
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      topicData: []
    }
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
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
  goList = (id, name) => {
    const { userInfo } = this.props.userStore
    const { isFinishTest } = userInfo
    if (id === 1002) {
      if (isFinishTest) {
        this.openUrl('major-list', { typeId: id, name: name }, true)
      } else {
        this.entryHolland()
      }
    } else {
      this.openUrl('major-list', { typeId: id, name: name }, true)
    }
  }
  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  render () {
    const iconsList = [{
      image: require('../assets/icons/allMajor.png'),
      text: '全部专业',
      id: '1001'
    },
    {
      image: require('../assets/icons/suitableMe.png'),
      text: '适合我的',
      id: 1002
    }, {
      image: require('../assets/icons/mostBoys.png'),
      text: '男生最多',
      id: 1003
    }, {
      image: require('../assets/icons/mostGirls.png'),
      text: '女生最多',
      id: 1004
    }]
    return (
      <View flex useSafeArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View centerH paddingV-10>
            <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
          </View>
          <View style={styles.iconsWrap} paddingH-10 marginT-20>
            {
              iconsList.map((item, index) =>
                <View key={index} style={styles.icon}>
                  <IconCeil onPress={() => this.goList(item.id, item.text)} imageSource={item.image} title={item.title} />
                  <Text center text-12 dark06>{item.text}</Text>
                </View>
              )
            }
          </View>
          <View paddingT-30>
            <ItemHead title='一分钟说专业' />
          </View>
          {this.audioList.map((item, index) => (
            <View key={index} marginH-15 marginB-10 style={styles.audioWrap}>
              {/* <TouchableOpacity activeOpacity={0.6} onPress={() => { this.openUrl('audio', { id: item.id, title: item.title, introduction: item.introduction, img: item.filePath }, false) }}>
                <Image style={styles.image} source={{ uri: imageResize(item.filePath, 350) }} />
                <Text text-22 light style={styles.title}>{item.title}</Text>
              </TouchableOpacity> */}
              <CardItem onPress={() => { this.openUrl('audio', { id: item.id, title: item.title, introduction: item.introduction, img: item.filePath }, false) }} imageSource={{ uri: imageResize(item.filePath, 350) }} imageStyle={{ height: 150 }} title={item.title} fileType='1' />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.getMinuteAudioSpecialList).then(data => {
      // console.log(data)
      if (data) {
        this.setValue('audioList', data)
      //  console.log(this.audioList)
      } else {
        this.setValue('audioList', [])
      }
    })
  }
}
const styles = StyleSheet.create({
  iconsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default ByMajor
