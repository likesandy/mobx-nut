import { AnnotationsMap, observable } from 'mobx'
import { useState } from 'react'

/**
 * 自定义Hook,用于创建一个局部的 observable store
 * @template TStore - 要渲染的响应式组件的返回类型
 * @param {() => TStore} initialState - 初始化数据
 * @param {AnnotationsMap<TStore, never>} annotations - 注解
 * @returns {TStore} - 返回一个可观察的对象
 */
export function useLocalObservable<TStore extends Record<string, any>>(
  initialState: () => TStore,
  // 注解
  annotations?: AnnotationsMap<TStore, never>
): TStore {
  return useState(() => observable(initialState(), annotations, { autoBind: true }))[0]
}

