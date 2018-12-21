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
