import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable routes = []
  @action.bound
  setRoutes (val) {
    console.log(typeof val)
    this.routes = val
  }
}
export default new Store()
