import { configure, observable, action, runInAction, computed } from 'mobx'
import { axios, api } from '../utils'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
class Store {
  @observable userInfo = {
    name: '',
    gender: true,
    isStudent: true,
    startYear: ''
  }
  @observable areaData = []
  @observable actionSheetStatus = false
  @observable areaPickerData = []
  @observable areaPickerVal = []
  @observable areaPickerId = []
  /* 学校相关 */
  @observable schoolData = []
  @observable schoolPickerData = []
  @observable schoolPickerVal = ''
  @observable schoolPickerId = ''

  @computed get genderString () {
    // alert(1)
    if (!_.isUndefined(this.userInfo.gender)) {
      return this.userInfo.gender.toString()
    }
  }
  @computed get isStudentString () {
    // alert(1)
    if (!_.isUndefined(this.userInfo.isStudent) && !_.isNull(this.userInfo.isStudent)) {
      return this.userInfo.isStudent.toString()
    } else {
      return 'true'
    }
  }
  @computed get areaPickerValString () {
    return this.areaPickerVal.join('-')
  }
  @action.bound
  clear () {
    this.areaData = []
    this.areaPickerData = []
    this.areaPickerVal = []
    this.schoolData = []
    this.schoolData = []
    this.schoolPickerData = []
    this.schoolPickerVal = ''
    this.schoolPickerId = ''
    this.userInfo = {
      name: '',
      gender: true,
      isStudent: true,
      startYear: ''
    }
  }
  @action.bound
  updateUserInfo (key, val) {
    this.userInfo[key] = val
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  @action.bound
  getUserInfo () {
    axios.get(api.getUserInfo).then(data => {
      runInAction(() => {
        this.userInfo = data
        this.areaPickerVal = [data.province.name, data.city.name, data.district.name]
        this.areaPickerId = [data.province.id, data.city.id, data.district.id]
        this.schoolPickerVal = data.school.name
        this.schoolPickerId = data.school.id
        this.getSchoolList(data.district.id)
      })
    })
  }
  @action.bound
  getSchoolList (id) {
    this.schoolData = []
    this.schoolPickerData = []
    axios.get(api.schoolList, { params: { districtId: id } }).then(data => {
      runInAction(() => {
        this.schoolData = data._embedded.schools
        this.schoolPickerData = _.map(this.schoolData, 'name')
      })
    })
  }
  @action.bound
  getArea () {
    axios.get(api.area).then(data => {
      runInAction(() => {
        let areaData = ((typeof data) === 'string' ? eval(`(${data})`) : data)
        let areaPickerData = []
        let len = areaData.length
        this.areaData = areaData
        for (let i = 0; i < len; i++) {
          let city = []
          for (let j = 0, cityLen = areaData[i]['cities'].length; j < cityLen; j++) {
            let _city = {}
            _city[areaData[i]['cities'][j]['name']] = _.map(areaData[i]['cities'][j]['districts'], 'name')
            city.push(_city)
          }

          let _data = {}
          _data[areaData[i]['name']] = city
          areaPickerData.push(_data)
        }
        this.areaPickerData = areaPickerData
      })
    })
  }
}
export default new Store()
