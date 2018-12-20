import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Image } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { ratio } from '../../utils'
export default class Page extends Component {
  render () {
    return (
      <View flex>
        <View paddingH-15>
          <View paddingV-15 row style={styles.item}>
            <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} borderRadius={40} style={{ width: 38, height: 38 }} />
            <View paddingL-7>
              <Text text-16 dark>舔狗之家</Text>
              <Text text-12 dark06>一分钟前</Text>
              <Text text-14 dark06 marginT-5>那段时间我几乎天天都要画画，画很多不同的“小人”。根据文章配图的需要，“小人”经常要表演出不同的姿势，不同的神情，时而忧伤，时而狂喜，大部分的时候我喜欢画他们面无表情。</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  item: {
    borderColor: colors.gray,
    borderBottomWidth: 1 / ratio
  }
})
