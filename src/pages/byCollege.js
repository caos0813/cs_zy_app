import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text } from '../../react-native-ui-lib'
import { HomeSearch, ItemHead, IconCeil, CardItem } from '../components'
import { api, axios } from '../utils'
export default class ByCollege extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topicData: []
    }
  }
  render () {
    const iconsList = [{
      image: require('../assets/icons/guo.png'),
      text: '全国'
    },
    {
      image: require('../assets/icons/sheng.png'),
      text: '本省'
    }, {
      image: require('../assets/icons/shuang.png'),
      text: '双一流'
    }, {
      image: require('../assets/icons/985.png'),
      text: '985'
    }, {
      image: require('../assets/icons/211.png'),
      text: '211'
    }]
    return (
      <View flex useSafeArea>
        <View centerH paddingV-10>
          <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
        </View>
        <View style={styles.iconsWrap} marginV-20>
          {
            iconsList.map((item, index) => (
              <IconCeil imageSource={item.image} title={item.text} key={index} />
            ))
          }
        </View>
        {
          this.state.topicData.map((item, index) => (
            <View key={index}>
              <View paddingT-10>
                <ItemHead title={item.title} seeAll='true' />
              </View>
              <View row style={styles.topics}>
                {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
                  item.articleInfoBean.content.map((el, i) => (
                    <View style={styles.topic} key={i}>
                      <CardItem title={el.title} imageSource={{ uri: el.picture }} desc={el.introduction} fileType={item.fileType} />
                    </View>
                  ))
                }
              </View >
            </View>
          ))
        }
        {/* <ScrollView style={styles.scroll}>
          <View style={styles.iconsWrap} marginV-20>
            {
              iconsList.map((item, index) => (
                <IconCeil imageSource={item.image} title={item.text} key={index} />
              ))
            }
          </View>
          {
            this.state.topicData.map((item, index) => (
              <View key={index}>
                <View paddingT-10>
                  <ItemHead title={item.title} seeAll='true' />
                </View>
                <View row style={styles.topics}>
                  {(item.articleInfoBean.content && item.articleInfoBean.content.length > 0) &&
                    item.articleInfoBean.content.map((el, i) => (
                      <View style={styles.topic} key={i}>
                        <CardItem title={el.title} imageSource={{ uri: el.picture }} desc={el.introduction} fileType={item.fileType} />
                      </View>
                    ))
                  }
                </View >
              </View>
            ))
          }
          ))
        </ScrollView> */}
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.queryModuleArticleInfo, { params: { moduleId: 1 } }).then(data => {
      this.setState({
        topicData: data.data.topicsAndArticlesList
      })
    }).catch(() => {
      alert(2)
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
    width: '100%'
  }
})
