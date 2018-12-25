import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, LoaderScreen } from '../../react-native-ui-lib'
import { ItemHead, ButtonCeil } from '../components'
import { api, axios, OpenUrl } from '../utils'
import { observer, inject } from 'mobx-react/native'
import { configure, observable, action } from 'mobx'
import { colors } from '../theme'
configure({
  enforceActions: 'always'
})
@inject('userStore')
@observer class ProfessionTag extends Component {
  @observable tagData = []
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
  render () {
    return (
      <View flex useSafeArea>
        {(!this.tagData || this.tagData.length <= 0) && <LoaderScreen color={colors.dark09} messageStyle={{ color: colors.dark09 }} message='正在加载...' />}
        {(this.tagData && this.tagData.length > 0) &&
          <ScrollView>
            <View>
              <ItemHead title='全部兴趣标签' />
            </View>
            <View style={styles.iconsWrap} marginV-10 paddingL-5>
              {
                this.tagData && this.tagData.map((item, index) => (
                  <ButtonCeil onPress={() => this.openUrl('profession-list', { id: item.id, name: item.name }, true)} title={item.name} enlish={item.englishName} />
                ))
              }
            </View>
          </ScrollView>
        }
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.queryCareerInterest).then(data => {
      if (data && data.randomCareerInterests) {
        this.setValue('tagData', data.allCareerInterest)
      }
    }).catch(() => {
    })
  }
}
const styles = StyleSheet.create({
  iconsWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
export default ProfessionTag
