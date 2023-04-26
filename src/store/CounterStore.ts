import { action, makeObservable, observable } from 'mobx'

class CounterStore {
  count = 0

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
    })
  }
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
}

const counterStore = new CounterStore()
export default counterStore

