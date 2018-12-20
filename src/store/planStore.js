import { configure, observable, action } from 'mobx'
configure({
  enforceActions: 'always'
})
class Store {
  @observable bannerData=[]
  @observable firstArticle={}
  @observable topics=[]
  @observable firstTopic=[]
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
}
export default new Store()
