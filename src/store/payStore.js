import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable payType = 'wechat'
  @observable payAmount = 0.00
  @observable cardNumber = ''
  @observable password = ''
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
