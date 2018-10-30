import React, { Component } from 'react'
import { Text, View, Avatar, TextInput, RadioButton, RadioGroup, Assets, Button, Image } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { ScrollView, StyleSheet } from 'react-native'
import Picker from 'react-native-picker'
import { colors } from '../theme'
import { ratio } from '../utils'
import { Mask } from '../components'
Assets.loadAssetsGroup('icons', {
  arrow: require('../assets/mine/arrow.png')
})
@inject('userStore', 'infoStore')
@observer class Info extends Component {
  showYearPicker=(val) => {
    const { update } = this.props.infoStore
    let yearData = []
    for (let i = 0; i < 4; i++) {
      yearData[i] = new Date().getFullYear() - i
    }
    Picker.init({
      pickerData: yearData,
      selectedValue: val ? [val] : [],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择',
      onPickerConfirm: data => {
        this.refs.mask.hide()
        update('startYear', data.toString())
      },
      onPickerCancel: data => {
        this.refs.mask.hide()
      },
      onPickerSelect: data => {

      }
    })
    Picker.show()
    this.refs.mask.show()
  }
  render () {
    let { userInfo, genderString } = this.props.infoStore
    // userInfo.gender = userInfo.gender.toString()
    return (
      <View flex useSafeArea >
        <Mask ref='mask' />
        <ScrollView>
          <View center paddingV-25>
            <Avatar
              imageSource={{ uri: userInfo.image }}
              containerStyle={{ width: 80, height: 80 }}
              imageStyle={{ width: 80, height: 80, borderRadius: 80 }}
              backgroundColor='transparent'
              imageProps={{ resizeMode: 'cover' }} />
          </View>
          <View>
            <View row center style={styles.item}>
              <Text gray>姓名</Text>
              <TextInput
                placeholder='请输入姓名'
                value={userInfo.name}
                text-15
                containerStyle={[styles.inputWrap, styles.wrapRight]}
                style={[styles.input, styles.inputRight]}
                hideUnderline
                enableErrors={false}
              />
            </View>
            <View row center style={styles.item}>
              <Text gray>性别</Text>
              <RadioGroup flex row left centerV marginL-20 value={genderString}>
                <Text marginR-10 dark06 text-16>男</Text>
                <RadioButton value='true' size={18} color={colors.calm} style={styles.radio} />
                <Text marginR-10 marginL-30 dark06 text-16>女</Text>
                <RadioButton value='false' size={18} color={colors.calm} style={styles.radio} />
              </RadioGroup>
            </View>
            <View row center style={styles.item}>
              <Text gray>地区</Text>
              <TextInput
                placeholder='请选择地区'
                text-15
                containerStyle={[styles.inputWrap]}
                hideUnderline
                enableErrors={false}
                rightIconSource={Assets.icons.arrow}
                expandable
                renderExpandable={() => { alert(1) }}
              />
            </View>
            <View row center style={styles.item}>
              <Text gray>学校</Text>
              <TextInput
                placeholder='请选择学校'
                text-15
                containerStyle={[styles.inputWrap]}
                hideUnderline
                enableErrors={false}
                rightIconSource={Assets.icons.arrow}
                expandable
                renderExpandable={() => { alert(1) }}
              />
            </View>
            <View row center style={styles.item}>
              <Text gray>入学</Text>
              <Button link style={styles.picker} onPress={() => this.showYearPicker(userInfo.startYear)}>
                <View flex>
                  <Text>{userInfo.startYear}</Text>
                </View>
                <Image assetName='arrow' />
              </Button>
            </View>
            <View padding-25>
              <Button bg-calm label='提交' />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    const { getUserInfo } = this.props.infoStore
    getUserInfo()
    /* reaction(() => userStore.userInfo, (data) => {
      alert(JSON.stringify(data))
    }) */
  }
}
export default Info
const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 10
  },
  inputWrap: {
    flex: 1,
    marginLeft: 13,
    height: 32,
    backgroundColor: colors.stable,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  input: {
    color: colors.dark
  },
  wrapRight: {
    borderColor: colors.calm,
    borderWidth: 1 / ratio
  },
  inputRight: {
    color: colors.calm
  },
  radio: {
    borderWidth: 1 / ratio,
    borderColor: colors.gray
  },
  arrowIcon: {
    position: 'absolute',
    right: 5,
    width: 10,
    height: 5,
    top: 10
  },
  picker: {
    flex: 1,
    marginLeft: 13,
    height: 32,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between'
  }
})
