import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Image } from '../../react-native-ui-lib'
import { CardItem } from '../components'
import { colors } from '../theme'
export default class Page extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '大学解读')
    }
  }
  render () {
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
        <ScrollView style={styles.scroll}>
          <View row style={styles.list}>
            {
              listItems.map((item, index) => (
                <View style={styles.item} key={index} >
                  <CardItem
                    imageSource={{ uri: item.img }}
                    imageStyle={{ height: 115 }}
                    title={item.title}
                    desc={item.text}
                  >
                    <View style={styles.cardFooter} paddingT-5>
                      <View row>
                        <View row centerV paddingR-10>
                          <Image assetName='attention' style={styles.cardItemImage} />
                          <Text dark06 text-11>12</Text>
                        </View>
                        <View row centerV>
                          <Image assetName='comment' style={styles.cardItemImage} />
                          <Text dark06 text-11>10</Text>
                        </View>
                      </View>
                      <Text dark06 text-11>一天前</Text>
                    </View>
                  </CardItem>
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
  scroll: {
    flex: 1
  },
  list: {
    flexDirection: 'column',
    padding: 15
  },
  item: {
    paddingBottom: 15
  },
  cardItemImage: {
    width: 12,
    height: 10,
    marginRight: 2,
    tintColor: colors.dark06
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
