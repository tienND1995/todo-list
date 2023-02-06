import React, { useState } from 'react'

function Form() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const handleChangeValue = (e) => {
    const data = { ...form }
    data[e.target.name] = e.target.value

    setForm(data)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const { email, password } = form
    console.log(email, password)
  }
  return (
    <form action="" onSubmit={handleSubmitForm}>
      <div className="item">
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Email..."
          name='email'
          onChange={handleChangeValue}
        />
      </div>

      <div className="item">
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password..."
          name='password'
          onChange={handleChangeValue}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
