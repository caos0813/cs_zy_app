import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Image, TextArea, Button } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { ratio } from '../../utils'
export default class Page extends Component {
  render () {
    return (
      <View flex bg-grey>
        <View paddingH-15 flex style={this.props.style}>
          <View paddingV-15 row style={styles.item}>
            <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} borderRadius={40} style={{ width: 38, height: 38 }} />
            <View flex paddingL-7>
              <Text text-16 dark>舔狗之家</Text>
              <Text text-12 dark06>一分钟前</Text>
              <Text text-14 dark06 marginT-5>那段时间我几乎天天都要画画，画很多不同的“小人”。根据文章配图的需要，“小人”经常要表演出不同的姿势，不同的神情，时而忧伤，时而狂喜，大部分的时候我喜欢画他们面无表情。</Text>
            </View>
          </View>
          <View paddingV-15 row style={styles.item}>
            <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} borderRadius={40} style={{ width: 38, height: 38 }} />
            <View flex paddingL-7>
              <Text text-16 dark>舔狗之家</Text>
              <Text text-12 dark06>一分钟前</Text>
              <Text text-14 dark06 marginT-5>那段时间我几乎天天都要画画，画很多不同的“小人”。根据文章配图的需要，“小人”经常要表演出不同的姿势，不同的神情，时而忧伤，时而狂喜，大部分的时候我喜欢画他们面无表情。</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer} >
          {/* <TextArea placeholder='请输入文字' containerStyle={{ width: 100 }} /> */}
          <Button label='确定' dark />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '#111',
    borderColor: colors.gray,
    borderTopWidth: 1 / ratio
  },
  item: {
    borderColor: colors.gray,
    borderBottomWidth: 1 / ratio
  }
})
