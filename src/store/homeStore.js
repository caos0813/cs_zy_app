import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable showSplash = false
  @observable bannerData=[]
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
