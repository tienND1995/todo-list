import React, { useState } from 'react'

export default function Counter(props) {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  return (
    <div className='count'>
      <div>{count}</div>
      <button type="button" onClick={handleIncrement}>
        Tăng
      </button>
      <button type="button" onClick={handleDecrement}>
        Giảm
      </button>
    </div>
  )
}
