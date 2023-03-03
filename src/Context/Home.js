import React, { useContext } from 'react'

import { StateContext } from './StateProvider'
export default function Home(props) {
  const context = useContext(StateContext)
  console.log(context, props)
  return <div>Home</div>
}
