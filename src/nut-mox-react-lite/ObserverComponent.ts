import { ReactElement } from 'react'
import { useObserver } from './useObserver'

export interface IObserverProps {
  children?(): ReactElement | null
  render?(): ReactElement | null
}

function ObserverComponent({ children, render }: IObserverProps) {
  const component = children || render
  if (typeof component !== 'function') return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useObserver(component)
}

export { ObserverComponent as Observer }

