import React, { Component } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { View, Text, Image, LoaderScreen } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { ratio, api, axios, Toast } from '../../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
configure({
  enforceActions: 'always'
})
@observer class Page extends Component {
  @action.bound
  setValue (key, val) {
    this[key] = val
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 10
    const { getParam } = this.props.navigation
    axios.get(api.queryPraiseCollect, {
      params: {
        page: page - 1,
        size: pageSize,
        articleInfoId: getParam('articleId')
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderItem = (item, index) => {
    return (
      <View paddingV-15 row style={styles.item}>
        <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} borderRadius={40} style={{ width: 38, height: 38 }} />
        <View flex paddingL-7>
          <Text text-16 dark>舔狗之家</Text>
          <Text text-12 dark06>一分钟前</Text>
          <Text text-14 dark06 marginT-5>那段时间我几乎天天都要画画，画很多不同的“小人”。根据文章配图的需要，“小人”经常要表演出不同的姿势，不同的神情，时而忧伤，时而狂喜，大部分的时候我喜欢画他们面无表情。</Text>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View flex bg-light>
        <View paddingH-15 flex style={this.props.style}>
          <UltimateListView ref='scroll' style={{ flex: 1, backgroundColor: colors.light }} keyExtractor={(item, index) => `${index} - ${item}`}
            onFetch={this.onFetch}
            item={this.renderItem}
            refreshable={false}
            waitingSpinnerText='正在加载...'
            spinnerColor={colors.calm}
            allLoadedText='--我是有底线的--'
            showsVerticalScrollIndicator={false}
            paginationFetchingView={() => <LoaderScreen color={colors.dark09} messageStyle={{ color: colors.dark09 }} message='正在加载...' />}
            emptyView={() => <View flex center padding-15><Text dark06>暂时没有内容</Text></View>}
          />
        </View>
      </View>
    )
  }
}
export default Page
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    height: 50,
    backgroundColor: colors.light,
    borderColor: colors.grey,
    borderTopWidth: 1 / ratio
  },
  item: {
    borderColor: colors.gray,
    borderBottomWidth: 1 / ratio
  }
})
