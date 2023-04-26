import { makeAutoObservable } from 'mobx'

export type Todo = {
  task: string
  completed: boolean
  assignee: string | null
}

export type TodoList = Todo[]

class TodoStore {
  constructor() {
    makeAutoObservable(this)
  }

  todoList: TodoList = [
    {
      task: 'Buy milk',
      completed: false,
      assignee: null,
    },
  ]

  addTodo = (task: string) => {
    this.todoList.push({
      task,
      completed: false,
      assignee: null,
    })
  }

  get completedTodoCount() {
    return this.todoList.filter((todo) => todo.completed).length
  }

  editorTodo = (index: number, todo: Todo) => {
    this.todoList[index] = todo
  }

  get report() {
    if (this.todoList.length === 0) {
      return '无'
    }

    const nextTodo =
      this.todoList.find((todo) => !todo.completed)?.task ?? '无'

    return `下一个待办${nextTodo},进度${this.completedTodoCount}/${this.todoList.length}`
  }
}

const todoStore = new TodoStore()
export default todoStore

