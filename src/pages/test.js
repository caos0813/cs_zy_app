import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from '../../react-native-ui-lib'
import { configure, observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { navigator } from '../utils'
import Video from 'react-native-video'
configure({
  enforceActions: 'always'
})
@observer class Test extends Component {
  @observable title=''
  @observable data={
    videoFile: 'http://att.chinauui.com/day_181210/20181210_44139e8c8918baf080534z81C8Z8a884.mp3'
  }
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
          <Video
            paused
            source={{ uri: this.data.videoFile }}
            // onLoad={this.audioLoad}
          />
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
