import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View } from '../../react-native-ui-lib'
import { HomeSearch, ItemHead, IconCeil, CardItem } from '../components'
import { api, axios, OpenUrl } from '../utils'
import { observer, inject } from 'mobx-react/native'
@inject('userStore')
@observer class ByCollege extends Component {
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
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  render () {
    const { userInfo } = this.props.userStore
    const iconsList = [{
      image: require('../assets/icons/guo.png'),
      text: '全国',
      type: '',
      id: ''
    },
    {
      image: require('../assets/icons/sheng.png'),
      text: '本省',
      type: 'provinces',
      id: userInfo.province.id
    }, {
      image: require('../assets/icons/shuang.png'),
      text: '双一流',
      type: 'collegeLevels',
      id: 1001
    }, {
      image: require('../assets/icons/985.png'),
      text: '985',
      type: 'collegeLevels',
      id: 1002
    }, {
      image: require('../assets/icons/211.png'),
      text: '211',
      type: 'collegeLevels',
      id: 1003
    }]
    return (
      <View flex useSafeArea>
        <View centerH paddingV-10>
          <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
        </View>
        <ScrollView>
          <View style={styles.iconsWrap} marginV-20>
            {
              iconsList.map((item, index) => (
                <IconCeil onPress={() => { this.openUrl('school-list', { type: item.type, id: item.id }, false) }} imageSource={item.image} title={item.text} key={index} />
              ))
            }
          </View>
          {
            this.state.topicData.map((item, index) => (
              <View key={index}>
                <View paddingT-10>
                  <ItemHead onPress={() => this.openNative('CommonList', { specialTopicInfoId: item.id, type: 1, title: item.title })} title={item.title} seeAll='true' />
                </View>
                <View row style={styles.topics}>
                  {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
                    item.articleInfoBean.content.map((el, i) => (
                      <View style={[styles.topic, item.articleInfoBean.content.length === 1 ? styles.one : '']} key={i}>
                        <CardItem onPress={() => { this.openNative('NewsDetail', { articleId: el.id }) }} title={el.title} imageSource={{ uri: el.picture }} imageStyle={{ height: item.articleInfoBean.content.length === 1 ? 115 : 85 }} desc={el.introduction} fileType={item.fileType} />
                      </View>
                    ))
                  }
                </View >
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.queryModuleArticleInfo, { params: { moduleId: 1 } }).then(data => {
      this.setState({
        topicData: data.topicsAndArticlesList
      })
    }).catch(() => {
      // alert(2)
    })
  }
}
const styles = StyleSheet.create({
  iconsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  topics: {
    flexWrap: 'wrap',
    paddingHorizontal: 3
  },
  topic: {
    paddingHorizontal: 12,
    paddingBottom: 15,
    width: '50%'
  },
  one: {
    width: '100%'
  }
})
export default ByCollege
