import { Reaction } from 'mobx'
import { useRef, useState } from 'react'

function observerComponentNameFor(baseComponentName: string) {
  return `observer${baseComponentName}`
}

export interface IReactionTracking {
  reaction: Reaction
}

/**
 * 自定义Hooks,用于将一个函数组件转换为响应式组件
 * @template T - 要渲染的响应式组件的返回类型
 * @param  {() => T} fn - 用于渲染响应式组件的函数
 * @param {string} baseComponentName - 响应式组件的名称，默认为 'observed'
 * @returns {T} - 渲染的响应式组件
 */
export function useObserver<T>(fn: () => T, baseComponentName = 'observed') {
  const [, setState] = useState()
  // 更新组件
  const forceUpdate = () => setState([] as any)

  // 使用useRef保存reaction对象,每一次组件渲染,用的都是同一个reaction对象
  const reactionTrackRef = useRef<IReactionTracking | null>(null)

  // 第一次渲染时，创建一个 Reaction 对象
  if (!reactionTrackRef.current) {
    reactionTrackRef.current = {
      reaction: new Reaction(observerComponentNameFor(baseComponentName), () => forceUpdate()),
    }
  }

  const { reaction } = reactionTrackRef.current

  let rendering!: T
  let exception

  // 追踪reaction的变化，当reaction变化时，重新渲染组件
  reaction.track(() => {
    try {
      rendering = fn()
    } catch (error) {
      exception = error
    }
  })

  return rendering
}

