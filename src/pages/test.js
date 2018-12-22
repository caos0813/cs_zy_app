import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from '../../react-native-ui-lib'
import { configure, observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { navigator } from '../utils'
configure({
  enforceActions: 'always'
})
@observer class Test extends Component {
  @observable title=''
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  render () {
    const listData = [{
      title: '列表一'
    }, {
      title: '列表二'
    }, {
      title: '列表三'
    }, {
      title: '列表四'
    }]
    return (
      <View padding-20>
        <View>
          <Text>mobx--{this.title}</Text>
        </View>
        {listData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigator.push('Test', { title: item.title })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

    )
  }
  componentDidMount () {
    const { getParam } = this.props.navigation
    this.setValue('title', getParam('title'))
  }
}
export default Test
