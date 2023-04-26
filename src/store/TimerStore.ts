import { makeAutoObservable } from 'mobx'

class TimerStore {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this)
  }

  incrementTimer() {
    this.secondsPassed++
  }
}

export default TimerStore

