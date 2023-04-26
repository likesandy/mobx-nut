import type { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import counterStore from '../store/CounterStore'

interface IProps {
  children?: ReactNode
}

const CounterPage: FC<IProps> = () => {
  return (
    <>
      <h2>Counter:{counterStore.count}</h2>
      <button onClick={() => counterStore.increment()}>+1</button>
      <button onClick={() => counterStore.decrement()}>-1</button>
    </>
  )
}

export default observer(CounterPage)

