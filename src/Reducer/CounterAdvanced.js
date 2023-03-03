import React, { useReducer } from 'react'
import { increment, decrement } from './Actions/counterType'

export default function CounterAdvanced() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'counter/increment':
        return { ...state, count: state.count + action.payload }

      case 'counter/decrement':
        return { ...state, count: state.count - action.payload }

      default:
        return state
    }
  }

  const initial = { count: 0 }
  const [state, dispatch] = useReducer(reducer, initial)
  const { count } = state

  const handleIncrement = () => {
    dispatch(increment(5))
  }

  const handleDecrement = () => {
    dispatch(decrement(3))
  }
  return (
    <div>
      <h3>Reducer</h3>
      <div>Count: {count}</div>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <button type="button" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  )
}
