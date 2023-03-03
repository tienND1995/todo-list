export const initialState = {
  todos: [
    {
      id: 1,
      name: 'công việc 1',
      completed: false,
    },

    {
      id: 2,
      name: 'công việc 2',
      completed: false,
    },

    {
      id: 3,
      name: 'công việc 3',
      completed: false,
    },
  ],
}

export const reducerTodo = (state, action) => {
  switch (action.type) {
    case 'todos/add':
      return { ...state, todos: state.todos.concat(action.payload) }

    case 'todos/remove':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case 'todos/mark':
      const todos = [...state.todos]
      const index = todos.findIndex((todo) => {
        return todo.id === action.payload.id
      })

      todos[index].completed = action.payload.status

      return {
        ...state,
        todos: todos,
      }

    default:
      return state
  }
}
