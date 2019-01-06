import { configure, observable, action, reaction } from 'mobx'
import _ from 'lodash'
configure({
  enforceActions: 'always'
})
class Store {
  @observable id = null
  @observable position = '00:00'
  @observable duration = '00:00'
  @observable progress = 0
  @observable translucent = false
  @observable audioEnd=false
  @observable paused=true
  @observable playList=[]
  @action.bound
  setValue (obj) {
    for (let x in obj) {
      this[x] = obj[x]
    }
  }
  @action.bound
  resetStore () {
    this.id = null
    this.position = '00:00'
    this.duration = '00:00'
    this.progress = 0
    this.audioEnd = false
    this.paused = true
  }
}
const playerStore = new Store()
reaction(() => playerStore.paused, (data) => {
  console.log(typeof data, data)
})
export default playerStore
