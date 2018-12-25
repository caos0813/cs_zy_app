import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, LoaderScreen } from '../../react-native-ui-lib'
import { HomeSearch, ItemHead, ButtonCeil, CardItem } from '../components'
import { api, axios, OpenUrl } from '../utils'
import { observer, inject } from 'mobx-react/native'
import { configure, observable, action } from 'mobx'
import { UltimateListView } from 'react-native-ultimate-listview'
import { colors } from '../theme'
configure({
  enforceActions: 'always'
})
@inject('userStore')
@observer class ByCollege extends Component {
  @observable tagData = []
  @observable lists = []
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  pressTag = (item) => {
    if (item.name === '更多') {
      this.openNative('ProfessionTag', {}, true)
    } else {
      this.openUrl('profession-list', { id: item.id, name: item.name }, true)
    }
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    const pageSize = 5
    axios.get(api.queryCareerGroupParent, {
      params: {
        page: page - 1,
        size: pageSize
      }
    }).then(data => {
      if (data) {
        startFetch(data.content, pageSize)
      }
    }).catch(() => {
      startFetch([], pageSize)
      abortFetch()
    })
  }
  renderContainer = () => {
    return (
      <View>
        <View>
          <ItemHead title='按兴趣找职业' />
        </View>
        <View style={styles.iconsWrap} marginV-20>
          {
            this.tagData && this.tagData.map((item, index) => (
              <ButtonCeil onPress={() => this.pressTag(item)} title={item.name} enlish={item.englishName} />
            ))
          }
        </View>
        <View>
          <ItemHead title='生涯职业库' />
        </View>
      </View>
    )
  }
  renderItem = (item, index, separator) => {
    return (
      <View paddingH-12 marginB-15>
        <CardItem onPress={() => this.openUrl('profession-parent-group', { id: item.id }, true)} title={item.title} imageSource={{ uri: item.picture }} imageStyle={{ height: 115 }} />
      </View>
    )
  }
  render () {
    return (
      <View flex useSafeArea>
        <View centerH paddingV-10>
          <HomeSearch onPress={() => this.openUrl(`search`, {}, true)} />
        </View>
        <UltimateListView ref='scroll' style={{ flex: 1, backgroundColor: colors.light }} keyExtractor={(item, index) => `${index} - ${item}`}
          header={() => this.renderContainer()}
          onFetch={this.onFetch}
          item={this.renderItem}
          refreshable={false}
          waitingSpinnerText='正在加载...'
          spinnerColor={colors.calm}
          allLoadedText='--我是有底线的--'
          // onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          paginationFetchingView={() => <LoaderScreen color={colors.dark09} messageStyle={{ color: colors.dark09 }} message='正在加载...' />}
        />
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.queryCareerInterest).then(data => {
      if (data && data.randomCareerInterests) {
        data.randomCareerInterests.push({ name: '更多', englishName: 'more' })
        this.setValue('tagData', data.randomCareerInterests)
      }
    }).catch(() => {
    })
  }
}
const styles = StyleSheet.create({
  iconsWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default ByCollege
