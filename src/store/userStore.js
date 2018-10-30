import { configure, observable, action, runInAction, reaction } from 'mobx'
import { axios, api, storage } from '../utils'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
class Store {
  @observable userInfo = {}
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
  if (data && !_.isEmpty(data)) {
    storage.save({
      key: 'userInfo',
      data: data
    })
    console.log('save userInfo:', data)
  }
})
export default userStore
