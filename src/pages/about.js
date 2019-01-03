import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text } from '../../react-native-ui-lib'
import { colors } from '../theme'
class About extends Component {
  render () {
    return (
      <View flex useSafeArea>
        <ScrollView style={styles.scroll}>
          <View marginB-15>
            <Text style={styles.text}>关于知涯
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}>知涯是全国最优质的学习提分和志愿填报的平台，覆盖全国20个省市，2000多所学校、数百万用户，用户的成功录取率达99.8%。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}> 知涯总部位于长沙，先后在全国设立21个办事处。公司专家团队由上海交大、武汉大学、湖南大学、湖南师范大学等高校知名教育专家组成，服务青少年教育课程、志愿填报、测试测评、生涯规划等方面。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}>知涯志愿APP，采用最先进的互联网+、人工智能、云计算和大数据技术支持。核心开发团队由原腾讯、京东、惠普等知名互联网企业的技术人员组成，团队超50人，实力雄厚，为青少年提供精准专业的选科、志愿填报、生涯规划指导。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}>知涯始终坚持以开放、积极、严谨、创新为价值观，以帮助青少年唤醒热爱、追寻梦想为使命，陪伴1亿青少年成长。
            </Text>
          </View>
          {/* <View marginB-15>
            <Text style={styles.text}> 地址：长沙岳麓区高新开发区岳麓大道西芯城科技园2栋2308室
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}> 邮箱：info@junyanginfo.com
            </Text>
          </View> */}
        </ScrollView>
      </View>
    )
  }
}
export default About
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 15
  },
  text: {
    color: colors.dark06,
    lineHeight: 24,
    textAlign: 'justify'
  }
})
