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
            <Text style={styles.text}>湖南钧扬网络技术有限公司成立于2018年，是一家致力于为青少年提供生涯决策服务的互联网公司，创始团队由上海交大、武汉大学、湖南大学等名校大牛组成。钧扬创立之初已获得百万美金级天使轮投资，和国内多所名牌中学和著名高校建立了项目合作。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}>我们以青少年生涯意识觉醒和生涯决策能力提升为使命，倡导用技术驱动生涯教育，让青少年及早认识未来工作的世界，积极探索个人职业，并将个人的兴趣、天赋和能力与未来的职业决策连接起来。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}> 我们专注于大数据和AI技术的研发和应用，针对不同阶段的青少年提供不同的产品和解决方案，从高中学科选择、志愿填报，到大学职业体验、就业辅导和后续的职场能力提升等方面，全方位理解并帮助他们做出科学、智慧的生涯决策。
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}>作为一家年轻的初创公司，我们始终坚持开放、平等和协作、共享的互联网精神，我们期望引领每个青少年勇于探索自我，寻找所爱，绽放个性，我们愿与每位努力着的青少年们合伙，共创美好未来！
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}> 地址：长沙岳麓区高新开发区岳麓大道西芯城科技园2栋2308室
            </Text>
          </View>
          <View marginB-15>
            <Text style={styles.text}> 邮箱：info@junyanginfo.com
            </Text>
          </View>
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
