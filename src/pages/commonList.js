import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { View, Text, Image, LoaderScreen, TouchableOpacity, Card } from '../../react-native-ui-lib'
import { CardItem, ItemHead } from '../components'
import { colors } from '../theme'
import { axios, api, transferTime, ratio, OpenUrl, storage, navigator } from '../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
import { observer, inject } from 'mobx-react/native'
@inject('userStore')
@observer class Page extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
    this.state = {
      articleData: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '大学解读')
    }
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const { params } = this.props.navigation.state
    const pageSize = 10
    let userInfo = null
    try {
      userInfo = await storage.load({
        key: 'userInfo'
      })
    } catch (err) {

    }
    let provinceId = (userInfo && userInfo.province) ? userInfo.province.id : 430000
    axios.get(api.queryViewMore, {
      params: {
        specialTopicInfoId: params.specialTopicInfoId,
        page: page - 1,
        size: pageSize,
        type: params.type,
        provinceId: provinceId
      }
    }).then(data => {
      startFetch(data.content, pageSize)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
    // let provinceId
    // storage.load({
    //   key: 'userInfo'
    // }).then((data) => {
    //   provinceId = data.province ? data.province.id : 430000
    //   console.log(provinceId)
    //   axios.get(api.queryViewMore, {
    //     params: {
    //       specialTopicInfoId: params.specialTopicInfoId,
    //       page: page - 1,
    //       size: pageSize,
    //       type: params.type,
    //       provinceId: provinceId
    //     }
    //   }).then(data => {
    //     startFetch(data.content, pageSize)
    //   }).catch(() => {
    //     startFetch([], pageSize)
    //     abortFetch()
    //   })
    // })
  }
  renderItem = (item, index) => {
    const { params } = this.props.navigation.state
    if (params.type === 1) {
      return (
        <View style={styles.article} key={index} >
          {/* <View paddingT-10>
            <ItemHead title={item.specialTopicInfoTitle} />
          </View> */}
          <CardItem onPress={() => { navigator.push('NewsDetail', { articleId: item.id }) }} imageStyle={{ height: 115 }} title={item.title} imageSource={{ uri: item.picture }} desc={item.introduction} fileType={item.fileType} />
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
                  <Text text-11 gray>{transferTime(item.createTime)}</Text>
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
      <View marginT-10 flex useSafeArea>
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
    paddingHorizontal: 15,
    marginBottom: 15
  }
})
export default Page
