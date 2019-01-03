import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, Keyboard, StatusBar } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { View, Text, Image, TouchableOpacity, TextInput, Button, LoaderScreen } from '../../../react-native-ui-lib'
import { colors } from '../../theme'
import { ratio, api, axios, Toast, transferTime, imageFormat } from '../../utils'
import { UltimateListView } from 'react-native-ultimate-listview'
configure({
  enforceActions: 'always'
})
@inject('routeStore')
@observer class Page extends Component {
  @observable content = ''
  @observable total = 0
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  onChangeText=(e) => {
    const { setValue } = this
    setValue('content', e)
  }
  submit=() => {
    const { content, setValue } = this
    const { commentTabId } = this.props.routeStore
    if (!content) {
      Toast('请输入内容')
    }
    axios.post(api.addComment, {
      content,
      articleInfoId: commentTabId
    }).then(data => {
      Toast('发布成功')
      Keyboard.dismiss()
      setValue('content', '')
      this.listScroll.refresh()
    }).catch((err) => {
      Toast(err.message || '发布失败')
    })
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 10
    const { commentTabId } = this.props.routeStore
    axios.get(api.queryArticleInfoComment, {
      params: {
        page: page - 1,
        size: pageSize,
        articleInfoId: commentTabId
      }
    }).then(data => {
      startFetch(data.content, pageSize)
      this.setValue('total', data.totalElements)
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  deleteComment=(id) => {
    const { commentTabId } = this.props.routeStore
    axios.post(api.deleteComment, {
      articleInfoId: commentTabId,
      id
    }).then(data => {
      Toast('删除成功')
      this.listScroll.refresh()
    }).catch(() => {
      Toast('操作失败')
    })
  }
  renderItem = (item, index) => {
    return (
      <View paddingV-15 row style={styles.item}>
        <Image source={imageFormat(item.userImage, item.gender)} borderRadius={40} style={{ width: 38, height: 38 }} />
        <View flex paddingL-7>
          <Text text-16 dark>{item.userName}</Text>
          <Text text-12 dark06>{transferTime(item.commentTime)}</Text>
          <Text text-14 dark06 marginT-5>{item.content}</Text>
        </View>
        {item.deleteState &&
        <TouchableOpacity activeOpacity={0.6} onPress={() => this.deleteComment(item.id)}>
          <Image assetName='delete' />
        </TouchableOpacity>
        }
      </View>
    )
  }
  render () {
    const { content } = this
    return (
      <View flex bg-light>
        <View paddingH-15 flex style={this.props.style}>
          <UltimateListView ref={(ref) => { this.listScroll = ref }} style={{ flex: 1, backgroundColor: colors.light }} keyExtractor={(item, index) => `${index} - ${item}`}
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
        <KeyboardAvoidingView style={styles.footer} behavior='height' enabled>
          <TextInput placeholder='请输入内容'
            hideUnderline
            text-14
            dark
            returnKeyType='send'
            onChangeText={this.onChangeText}
            onSubmitEditing={this.submit}
            containerStyle={{ flex: 1 }}
            enableErrors={false}
            value={content}
          />
          <Button label='发布' text-14 light size='small' onPress={this.submit} disabled={!content} />
        </KeyboardAvoidingView>
      </View>
    )
  }
  componentWillUnmount () {
    const { getParam } = this.props.navigation
    const refresh = getParam('refresh')
    refresh && refresh(this.total)
    StatusBar.setBarStyle('dark-content', true)
  }
  componentDidMount () {
    StatusBar.setBarStyle('light-content', true)
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
