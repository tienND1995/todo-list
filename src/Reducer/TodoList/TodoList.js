import React, { useState, useReducer } from 'react'
import { reducerTodo, initialState } from './reducer'
import { v4 as uuid } from 'uuid'
import './TodoList.css'

export default function TodoList() {
  const [state, dispatch] = useReducer(reducerTodo, initialState)
  const { todos } = state
  const [name, setName] = useState('')

  const handleChangeValue = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const todo = {
      id: uuid(),
      name: name,
      completed: false,
    }
    setName('')

    dispatch({
      type: 'todos/add',
      payload: todo,
    })
  }

  const handleDelete = (id) => {
    dispatch({
      type: 'todos/remove',
      payload: id,
    })
  }

  const handleMarkCompleted = (e, id) => {
    dispatch({
      type: 'todos/mark',
      payload: {
        id,
        status: e.target.checked,
      },
    })
  }

  return (
    <div>
      <h2>Todo List</h2>

      {todos.map(({ id, name, completed }) => {
        return (
          <div className="item" key={id}>
            <span>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleMarkCompleted(e, id)
                }}
              />
            </span>
            <span className={completed ? 'completed' : ''}>{name}</span>
            <span
              onClick={() => {
                handleDelete(id)
              }}
            >
              &times;
            </span>
          </div>
        )
      })}

      <hr />

      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Tên công việc..."
            name="name"
            onChange={handleChangeValue}
            value={name}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
