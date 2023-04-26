import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useLocalObservable } from '../nut-mox-react-lite'

export interface ITimer {
  secondsPassed: number
  incrementTimer: () => void
}

const Timer = observer(() => {
  // const [timer] = useState(() => new TimerStore())

  // const [timer] = useState(() =>
  //   observable({
  //     secondsPassed: 0,
  //     incrementTimer() {
  //       this.secondsPassed++
  //     },
  //   })
  // )

  // 对上面操作的封装
  const timer = useLocalObservable(() => ({
    secondsPassed: 0,
    incrementTimer() {
      this.secondsPassed++
    },
  }))

  useEffect(() => {
    const second = setInterval(() => {
      timer.incrementTimer()
    }, 1000)

    return () => {
      clearInterval(second)
    }
  }, [timer])

  return (
    <>
      <div>{timer.secondsPassed}s</div>
    </>
  )
})

export default Timer

