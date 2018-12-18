import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text } from '../../react-native-ui-lib'
import { HomeSearch, ItemHead, IconCeil, CardItem } from '../components'
export default class ByCollege extends Component {
  constructor (props) {
    super(props)
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
    const listItems = [{
      title: '最科学的填报志愿方法',
      text: '50位专家共同参与设计的科学填报法，为你定制最佳的志愿方案。根据你的高考分数推荐最合适的大学及专业',
      img: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813',
      time: 1544758251211
    }, {
      title: '最精准的数据支撑好滴hi好的撒会对的撒',
      text: '院校、专业录取数据、招生计划与考试院同步更新。根据你的高考分数推荐最合适的大学及专业',
      img: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813',
      time: 1547360000000
    }, {
      title: '最专业的生涯顾问服务',
      text: '生涯规划专家、教育专家、高级教师实时指导，为学生提供精准定制服务，辅助生涯规划决策。根据你的高考分数推荐最合适的大学及专业',
      img: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813',
      time: 1540060000000
    }, {
      title: '最智能的生涯测评',
      text: '为你提供最全面、最客观的”专业“评价，让你更多元、更深入的了解专业。',
      img: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813',
      time: 1530060000000
    }]
    return (
      <View flex useSafeArea>
        <View centerH paddingV-10>
          <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.iconsWrap} marginV-20>
            {
              iconsList.map((item, index) => (
                <IconCeil imageSource={item.image} title={item.text} key={index} />
              ))
            }
          </View>
          <View paddingT-10>
            <ItemHead title='大学解读' seeAll='true' />
          </View>
          <View row style={styles.list}>
            {
              listItems.map((item, index) => (
                <View style={styles.item} key={index} >
                  <CardItem
                    imageSource={{ uri: item.img }}
                    title={item.title}
                    desc={item.text}
                  />
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  iconsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  list: {
    flexWrap: 'wrap',
    paddingHorizontal: 3
  },
  item: {
    paddingHorizontal: 12,
    paddingBottom: 15,
    width: '50%'
  }
})
