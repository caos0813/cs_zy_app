import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable headerOpacity = false
  @observable barStyle='light-content'
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
