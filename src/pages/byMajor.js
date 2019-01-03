import React, { Component } from 'react'
import { StyleSheet, ScrollView, findNodeHandle } from 'react-native'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { HomeSearch, IconCeil, ItemHead } from '../components'
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
        <View centerH paddingV-10>
          <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
        </View>
        <ScrollView>
          <View style={styles.iconsWrap} paddingH-10 marginT-20>
            {
              iconsList.map((item, index) =>
                <View key={index} style={styles.icon}>
                  <IconCeil onPress={() => { this.openUrl('major-list', { typeId: item.id, name: item.text }, false) }} imageSource={item.image} title={item.title} />
                  <Text center text-12 dark06>{item.text}</Text>
                </View>
              )
            }
          </View>
          <View paddingT-30>
            <ItemHead title='一分钟说专业' />
          </View>
          {this.audioList.map((item, index) => (
            <View key={index} marginH-10 marginB-10 style={styles.audioWrap}>
              <TouchableOpacity activeOpacity={0.6} onPress={() => { this.openUrl('audio', { id: item.id, title: item.title, introduction: item.introduction, img: item.filePath }, false) }}>
                <Image style={styles.image} source={{ uri: imageResize(item.filePath, 350) }} />
                <Text text-22 light style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.getMinuteAudioSpecialList).then(data => {
      console.log(data)
      if (data) {
        this.setValue('audioList', data)
        console.log(this.audioList)
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
  },
  audioWrap: {
    position: 'relative'
  },
  image: {
    borderRadius: 6,
    height: 150
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'right',
    padding: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2
  }
})
export default ByMajor
