import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable title='***'
  @observable duration='--:--'
  @observable position='--:--'
  @observable paused=true
  @observable data = {
  }
  @observable html = null
  @observable webviewHeight=0
  @observable moreData=[]
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
