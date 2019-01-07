import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { observable, action } from 'mobx'
import { ScrollView, StyleSheet } from 'react-native'
import { colors } from '../theme'
import { Header } from '../components'
import { View, Image, Text } from '../../react-native-ui-lib'
@observer class Subject extends Component {
  @observable img = ''
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  constructor (props) {
    super(props)
  }
  render () {
    const { getParam } = this.props.navigation
    return (
      <View>
        <Header showLeft btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }} containerStyle={styles.header} tintColor={colors.light} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <Image style={{ width: '100%', height: 250 }} assetName={this.img} />
          <View paddingH-15 paddingV-10>
            <Text dark center>{getParam('text')}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    const { getParam } = this.props.navigation
    switch (getParam('id')) {
      case '1':
        this.setValue('img', 'subject_chinese')
        break
      case '2':
        this.setValue('img', 'subject_math')
        break
      case '3':
        this.setValue('img', 'subject_english')
        break
      case '4':
        this.setValue('img', 'subject_physics')
        break
      case '5':
        this.setValue('img', 'subject_chemistry')
        break
      case '6':
        this.setValue('img', 'subject_biology')
        break
      case '7':
        this.setValue('img', 'subject_politics')
        break
      case '8':
        this.setValue('img', 'subject_history')
        break
      case '9':
        this.setValue('img', 'subject_geography')
        break
    }
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: 100,
    top: 0,
    zIndex: 2,
    backgroundColor: 'transparent'
  }
})
export default Subject
