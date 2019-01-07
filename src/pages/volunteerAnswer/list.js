import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, LoaderScreen, TouchableOpacity } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { api, axios, ratio } from '../../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
import { withNavigation } from 'react-navigation'
class Page extends Component {
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 10
    axios.get(api.queryViewMore, {
      params: {
        page: page - 1,
        size: pageSize,
        type: 1,
        specialTopicInfoId: this.props.id
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderItem = (item, index) => {
    const { navigation } = this.props
    return (
      <View paddingH-15 >
        <TouchableOpacity style={styles.item} onPress={() => {
          navigation.navigate('NewsDetail', { articleId: item.id, type: 'volunteer' })
        }}>
          <Text text-16 dark numberOfLines={1} >{item.title}</Text>
          <View right>
            <Text text-11 dark09>阅读量：{item.readNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    return (
      <UltimateListView ref='scroll' style={{ flex: 1, backgroundColor: colors.light }} keyExtractor={(item, index) => `${index} - ${item}`}
        onFetch={this.onFetch}
        item={this.renderItem}
        refreshable={false}
        waitingSpinnerText='正在加载...'
        spinnerColor={colors.calm}
        allLoadedText='--我是有底线的--'
        showsVerticalScrollIndicator={false}
        paginationFetchingView={() => <LoaderScreen color={colors.dark09} messageStyle={{ color: colors.dark09 }} message='正在加载...' />}
        emptyView={() => <View flex center><Text dark06>暂时没有内容</Text></View>}
      />
    )
  }
  componentDidMount () {
  }
}
export default withNavigation(Page)
const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1 / ratio
  }
})
