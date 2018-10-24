import { observable } from 'mobx'
class Store {
  @observable token = ''
}
export default new Store()
