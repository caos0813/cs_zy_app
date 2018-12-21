import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { View, Text, Image, LoaderScreen, TouchableOpacity, Card } from '../../react-native-ui-lib'
import { CardItem, ItemHead } from '../components'
import { colors } from '../theme'
import { axios, api, formatDate, ratio } from '../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleData: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '大学解读')
    }
  }
  // 转换时间
  transferTime = (date) => {
    let timeDiffer = ((new Date().getTime() - date) / (3600 * 1000))
    if (timeDiffer <= 1) {
      date = '刚刚'
    } else if (timeDiffer > 1 && timeDiffer <= 2) {
      date = '1小时前'
    } else if (timeDiffer > 2 && timeDiffer < 24) {
      date = `${Math.round(timeDiffer)}小时前`
    } else if (timeDiffer >= 24 && timeDiffer <= 48) {
      date = '昨天'
    } else if (timeDiffer > 48) {
      date = formatDate(date, 'M月d日')
    }
    return date
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const { params } = this.props.navigation.state
    const pageSize = 10
    axios.get(api.queryViewMore, {
      params: {
        specialTopicInfoId: params.specialTopicInfoId,
        page: page - 1,
        size: pageSize,
        type: params.type,
        provinceId: 430000
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderItem = (item, index) => {
    const { params } = this.props.navigation.state
    if (params.type === 1) {
      return (
        <View style={styles.article} key={index} >
          <View paddingT-10>
            <ItemHead title={item.specialTopicInfoTitle} leftIcon='true' />
          </View>
          <CardItem imageStyle={{ height: 115 }} title={item.title} imageSource={{ uri: item.picture }} desc={item.introduction} fileType={item.fileType} />
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.link).catch(err => console.error('An error occurred', err))} style={styles.item} activeOpacity={0.6} key={index}>
          <Card borderRadius={0} enableShadow={false} style={{ backgroundColor: colors.light }}>
            <Card.Item>
              <View paddingV-10>
                <Text text-16 dark >{item.title}</Text>
                <View row style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Text text-11 gray>{this.transferTime(item.createTime)}</Text>
                </View>
              </View>
            </Card.Item>
          </Card>
        </TouchableOpacity>
      )
    }
  }
  render () {
    return (
      <View flex useSafeArea>
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
    marginHorizontal: 10,
    borderTopWidth: 1 / ratio,
    borderColor: colors.gray
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
  },
  article: {
    paddingHorizontal: 12
  }
})
