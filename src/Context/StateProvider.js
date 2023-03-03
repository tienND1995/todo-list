import React, { createContext } from 'react'

export const StateContext = createContext()
const StateProvider = (props) => {
  console.log(props)
  return (
    <StateContext.Provider value={{ msg: 'hello' }}>
      {props.children}
    </StateContext.Provider>
  )
}
export default StateProvider
