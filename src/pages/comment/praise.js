import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { configure, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Image, LoaderScreen } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { ratio, api, axios, imageFormat, transferTime } from '../../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
configure({
  enforceActions: 'always'
})
@inject('routeStore')
@observer class Page extends Component {
  @action.bound
  setValue (key, val) {
    this[key] = val
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 10
    const { commentTabId } = this.props.routeStore
    axios.get(api.queryPraiseCollect, {
      params: {
        page: page - 1,
        size: pageSize,
        articleInfoId: commentTabId
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
        <Image source={imageFormat(item.userImg, true)} borderRadius={40} style={{ width: 38, height: 38 }} />
        <View flex paddingL-7>
          <Text text-16 dark>{item.userName}</Text>
          <Text text-12 dark06>{transferTime(item.time)}</Text>
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
