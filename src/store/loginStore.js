import { configure, observable, computed, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable phoneNum = ''
  @observable verificationCode = ''
  @observable tick = 90
  @observable nextPressed = false
  /* 手机错误提示 */
  @computed get phoneErrorText () {
    if (!(/^1[34578]\d{9}$/.test(this.phoneNum)) && this.phoneNum) {
      return '手机号码格式错误'
    }
  }
  /* @computed get getCodeArr () {
    let arr = []
    for (let i = 0; i < 6; i++) {
      if (!this.verificationCode.length) {
        arr[i] = {
          value: '',
          type: 0// 0 默认 1输入 2下一个
        }
      } else {
        let valArr = this.verificationCode.split('')
        if (i < this.verificationCode.length) {
          arr[i] = {
            value: valArr[i],
            type: 1// 0 默认 1输入 2下一个
          }
        } else if (i === this.verificationCode.length) {
          arr[i] = {
            value: valArr[i],
            type: 2// 0 默认 1输入 2下一个
          }
        } else {
          arr[i] = {
            value: '',
            type: 0// 0 默认 1输入 2下一个
          }
        }
      }
    }
    // return '手机号码格式错误'
    return arr
  } */
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
