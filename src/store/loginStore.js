import { observable, computed, action } from 'mobx'
class Store {
  @observable phoneNum = ''
  @observable verificationCode = ''
  @observable tick = 150
  /* 手机错误提示 */
  @computed get phoneErrorText () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNum)) && this.phoneNum) {
      return '手机号码格式错误'
    }
  }
  /* 是否禁用下一步按钮  */
  @computed get phoneValid () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNum))) {
      return true
    } else {
      return false
    }
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  @action.bound
  countDown () {
    if (this.tick > 0) {
      this.tick--
    }
  }
}
export default new Store()
