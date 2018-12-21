import React, { Component } from 'react'
import { Text, View, Avatar, TextInput, RadioButton, RadioGroup, Button, Image } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { ScrollView, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import Picker from 'react-native-picker'
import { colors } from '../theme'
import { ratio, axios, Toast, api, BackPress } from '../utils'
import { Mask } from '../../react-native-root-ui'
@inject('userStore', 'infoStore')
@observer class Info extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type') === 'complete' ? '完善用户信息' : '修改用户信息'
    }
  }
  constructor (props) {
    super(props)
    this.backPress = new BackPress({ backPress: this.onBackPress })
  }
  onBackPress = () => {
    const status = Mask.getStatus()
    if (status) {
      Picker.hide()
      Mask.hide()
      return true
    } else {
      return false
    }
  }
  showYearPicker = () => {
    const { updateUserInfo, userInfo } = this.props.infoStore
    let yearData = ['高一', '高二', '高三']
    Picker.init({
      pickerData: yearData,
      selectedValue: userInfo.startYear ? [userInfo.startYear] : [],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择',
      onPickerConfirm: data => {
        updateUserInfo('startYear', data[0])
        Mask.hide()
      },
      onPickerCancel: data => {
        Mask.hide()
      },
      onPickerSelect: data => {

      }
    })
    Picker.show()
    Mask.show()
  }
  showSchoolPicker = () => {
    const { schoolPickerVal, schoolData, schoolPickerData, setValue } = this.props.infoStore
    if (!schoolPickerData.length) {
      Toast('该地区下暂无学校数据')
      return
    }
    Picker.init({
      pickerData: schoolPickerData,
      selectedValue: [schoolPickerVal],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择',
      pickerTextEllipsisLen: 24,
      onPickerConfirm: data => {
        Mask.hide()
        let pickerValue = data[0] || schoolPickerData[0]
        setValue('schoolPickerVal', pickerValue)
        const pickerItem = _.find(schoolData, (item) => { return item.name === pickerValue })
        setValue('schoolPickerId', pickerItem.id)
        // updateUserInfo('startYear', data.toString())
      },
      onPickerCancel: data => {
        Mask.hide()
      },
      onPickerSelect: data => {

      }
    })
    Picker.show()
    Mask.show()
  }
  showAreaPicker = (val) => {
    const { getParam } = this.props.navigation
    const { areaPickerData, areaPickerVal, setValue, areaData, getSchoolList } = this.props.infoStore
    const { province } = this.props.infoStore.userInfo
    let pickerData = areaPickerData
    if (getParam('type') !== 'complete') {
      pickerData = [_.find(areaPickerData, (obj) => {
        for (let x in obj) {
          return x === province.name
        }
      })]
      // pickerData = api.personData
    }
    Picker.init({
      pickerData: pickerData,
      selectedValue: areaPickerVal,
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择',
      onPickerConfirm: data => {
        // alert(typeof data)
        Mask.hide()
        setValue('areaPickerVal', data)
        /* 获取对应的id */
        let idArr = []
        const pickerItem = _.find(areaData, (item) => { return item.name === data[0] })
        const pickCity = _.find(pickerItem.cities, (item) => { return item.name === data[1] })
        const pickDistrict = _.find(pickCity.districts, (item) => { return item.name === data[2] })
        idArr[0] = pickerItem.id
        idArr[1] = pickCity.id
        idArr[2] = pickDistrict.id
        setValue('areaPickerId', idArr)
        /* 重新获取学校 */
        getSchoolList(pickDistrict.id)
        setValue('schoolPickerVal', '')
        setValue('schoolPickerId', '')
      },
      onPickerCancel: data => {
        Mask.hide()
      },
      onPickerSelect: data => {

      }
    })
    Picker.show()
    Mask.show()
  }
  sexChange = (e) => {
    const { updateUserInfo } = this.props.infoStore
    let gender = e === 'true'
    updateUserInfo('gender', gender)
  }
  identityChange = (e) => {
    const { updateUserInfo } = this.props.infoStore
    let gender = e === 'true'
    updateUserInfo('isStudent', gender)
  }
  submit = () => {
    const { areaPickerId, schoolPickerId, userInfo, areaPickerValString } = this.props.infoStore
    const { name, image, id, gender, startYear, nickName, isStudent } = userInfo
    const { getUserInfo } = this.props.userStore
    const { getParam, reset, goBack } = this.props.navigation
    if (!schoolPickerId || !name || !startYear || !areaPickerValString) {
      Toast('请先完善您的信息')
      return
    } else {
      let reg = /[^\u4e00-\u9fa5]/
      if (reg.test(name)) {
        Toast('姓名必需为中文')
      }
    }
    let params = {
      name,
      image,
      id,
      gender,
      isStudent,
      startYear,
      nickName,
      province: {
        id: areaPickerId[0]
      },
      city: {
        id: areaPickerId[1]
      },
      district: {
        id: areaPickerId[2]
      },
      school: {
        id: schoolPickerId
      }
    }
    let url = api.updateUserInfo
    if (getParam('type') === 'complete') {
      url = api.personData
    }
    axios.post(url, params).then(data => {
      Toast('保存成功')
      getUserInfo()
      if (getParam('type') === 'complete') {
        reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
      } else {
        goBack()
      }
    }).catch((err) => {
      Toast(err.message)
    })
  }
  render () {
    let { userInfo, genderString, isStudentString, areaPickerValString, schoolPickerVal, updateUserInfo } = this.props.infoStore
    // userInfo.gender = userInfo.gender.toString()
    return (
      <View flex useSafeArea >
        <ScrollView>
          <View center paddingV-25 >
            {userInfo.image &&
              <Avatar
                imageSource={{ uri: userInfo.image }}
                size={80}
                backgroundColor='transparent'
                imageProps={{ resizeMode: 'cover' }} />
            }
          </View>
          <View>
            <View row center style={styles.item}>
              <Text gray>身份</Text>
              <RadioGroup flex row left centerV marginL-20 value={isStudentString} onValueChange={this.identityChange}>
                <Text marginR-10 dark06 text-16>学生</Text>
                <RadioButton value='true' size={18} color={colors.calm} style={styles.radio} />
                <Text marginR-10 marginL-30 dark06 text-16>家长</Text>
                <RadioButton value='false' size={18} color={colors.calm} style={styles.radio} />
              </RadioGroup>
            </View>
            <View row center style={styles.item}>
              <Text gray>姓名</Text>
              <TextInput
                placeholder='请输入姓名'
                value={userInfo.name}
                text-15
                containerStyle={[styles.inputWrap]}
                style={[styles.input]}
                hideUnderline
                onChangeText={val => updateUserInfo('name', val)}
                enableErrors={false}
              />
            </View>
            <View row center style={styles.item}>
              <Text gray>性别</Text>
              <RadioGroup flex row left centerV marginL-20 value={genderString} onValueChange={this.sexChange}>
                <Text marginR-10 dark06 text-16>男</Text>
                <RadioButton value='true' size={18} color={colors.calm} style={styles.radio} />
                <Text marginR-10 marginL-30 dark06 text-16>女</Text>
                <RadioButton value='false' size={18} color={colors.calm} style={styles.radio} />
              </RadioGroup>
            </View>

            <View row center style={styles.item}>
              <Text gray>地区</Text>
              <Button link style={styles.picker} onPress={() => this.showAreaPicker()}>
                <View flex>
                  {areaPickerValString ? <Text dark>{areaPickerValString}</Text> : <Text dark>请选择所在地区</Text>}
                </View>
                <Image assetName='arrow' />
              </Button>
            </View>
            <View row center style={styles.item}>
              <Text gray>学校</Text>
              <Button link style={styles.picker} onPress={() => this.showSchoolPicker()}>
                <View flex>
                  {schoolPickerVal ? <Text dark>{schoolPickerVal}</Text> : <Text dark>请选择学校</Text>}
                </View>
                <Image assetName='arrow' />
              </Button>
            </View>
            <View row center style={styles.item}>
              <Text gray>年级</Text>
              <Button link style={styles.picker} onPress={() => this.showYearPicker()}>
                <View flex>
                  {userInfo.startYear ? <Text dark>{userInfo.startYear}</Text> : <Text dark>请选择年级</Text>}
                </View>
                <Image assetName='arrow' />
              </Button>
            </View>
            <View padding-25>
              <Button bg-calm label='保存' onPress={this.submit} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  componentDidMount () {
    const { getParam } = this.props.navigation
    const { getUserInfo, getArea } = this.props.infoStore
    if (getParam('type') !== 'complete') {
      getUserInfo()
    }
    getArea()
    this.backPress.componentDidMount()
    /* reaction(() => userStore.userInfo, (data) => {
      alert(JSON.stringify(data))
    }) */
  }
  componentWillUnmount () {
    this.backPress.componentWillUnmount()
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
    paddingLeft: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.stable,
    borderRadius: 15,
    paddingRight: 15
  }
})
