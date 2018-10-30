import { configure, observable, action, runInAction, computed } from 'mobx'
import { axios, api } from '../utils'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
class Store {
  @observable userInfo = {}
  @observable mask = false
  @computed get isVipValid () {
    if (!_.isEmpty(this.userInfo)) {
      const { isValid, level } = this.userInfo
      if (isValid && (level === 'FULL_FEATURED' || level === 'ZHI_YUAN')) {
        return true
      }
    }
  }
  @computed get genderString () {
    if (!_.isUndefined(this.userInfo.gender)) {
      return this.userInfo.gender.toString()
    }
  }
  @action.bound
  setMask (status) {
    this.mask = status
  }
  @action.bound
  update (key, val) {
    this.userInfo[key] = val
  }
  @action.bound
  getUserInfo () {
    axios.get(api.getUserInfo).then(data => {
      runInAction(() => {
        this.userInfo = data
      })
    })
  }
}
export default new Store()
