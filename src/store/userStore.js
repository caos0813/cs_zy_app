import { configure, observable, action, runInAction, reaction, computed } from 'mobx'
import { axios, api, storage } from '../utils'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
class Store {
  @observable userInfo = {}
  @computed get isVipValid () {
    if (!_.isEmpty(this.userInfo)) {
      const { isValid, level } = this.userInfo
      if (isValid && (level === 'FULL_FEATURED' || level === 'ZHI_YUAN')) {
        return 2
      } else if (isValid || level === 'EXPERIENCE') {
        return 1
      } else {
        return 0
      }
    }
  }
  @computed get genderString () {
    if (!_.isUndefined(this.userInfo.gender)) {
      return this.userInfo.gender.toString()
    }
  }
  @action.bound
  setUserInfo (data) {
    this.userInfo = data
  }
  @action.bound
  getUserInfo () {
    Promise.all([axios.get(api.getUserInfo), axios.get(api.isFinishTest)]).then(
      (data) => {
        let userInfo = data[0]
        userInfo.isFinishTest = data[1]
        runInAction(() => {
          this.userInfo = { ...this.userInfo, ...userInfo }
        })
      }
    ).catch((err) => {
      console.log(err)
    })
  }
}
const userStore = new Store()
/* 监听userInfo更新storage */
reaction(() => userStore.userInfo, (data) => {
  if (data) {
    storage.save({
      key: 'userInfo',
      data: data
    })
  }
})

export default userStore
