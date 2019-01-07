import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable routes = []
  @observable commentTabId = ''
  @action.bound
  setRoutes (val) {
    this.routes = val
  }
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
