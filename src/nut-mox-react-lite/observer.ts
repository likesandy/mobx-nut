import { memo } from 'react'
import { useObserver } from './useObserver'

/**
 * HOC 用于将 React 函数组件转换成响应式组件
 * @param {React.FunctionComponent<P>} baseComponent - 要转换成响应式组件的 React 函数组件
 * @returns {React.FunctionComponent<P>} - 转换后的响应式组件
 */
export function observer<P>(baseComponent: React.FunctionComponent<P>) {
  // 获取 baseComponent 的名称
  const baseComponentName = baseComponent.displayName || baseComponent.name

  //  创建 ObserverComponent 组件，它会自动更新可观察对象的值
  let ObserverComponent = (props: any) => {
    return useObserver(() => baseComponent(props), baseComponentName)
  }

  // 使用 React.memo 对 ObserverComponent 进行性能优化
  ObserverComponent = memo(ObserverComponent)

  return ObserverComponent
}

