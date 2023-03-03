import React, { useEffect, useRef } from 'react'
import Input from './Input'

function SearchForm() {
  const inputRef = useRef()

  useEffect(() => {
    console.log(inputRef)
  }, [])
  return <Input ref={inputRef} />
}
export default SearchForm
