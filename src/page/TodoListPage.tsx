import { memo } from 'react'
import todoStore, { Todo } from '../store/TodoStore'
import { observer } from '../nut-mox-react-lite'

const TodoView = observer(({ todo, index }: { todo: Todo; index: number }) => {
  return (
    <>
      <li
        onDoubleClick={() =>
          todoStore.editorTodo(index, {
            ...todo,
            task: prompt('请输入任务名称', todo.task) || todo.task,
          })
        }
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => todoStore.editorTodo(index, { ...todo, completed: !todo.completed })}
        />
        {todo.task}
      </li>
    </>
  )
})

const TodoListPage = memo(
  observer(() => {
    return (
      <>
        <button onClick={() => todoStore.addTodo(prompt('请输入任务名称') || '吃饭')}>
          添加任务
        </button>
        <div>{todoStore.report}</div>
        <div>完成了{todoStore.completedTodoCount}个任务</div>
        <ul>
          {todoStore.todoList.map((todo, index) => (
            <TodoView key={index} todo={todo} index={index} />
          ))}
        </ul>
      </>
    )
  })
)

export default TodoListPage

