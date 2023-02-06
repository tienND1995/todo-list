import React, { useState, useEffect } from 'react'
import config from '../../Config/Config.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Modal from 'react-bootstrap/Modal'

const { SERVER_API } = config

function Todos() {
  // ! Khu vực nguy hiểm
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState({
    email: '',
    name: '',
    status: '1',
  })

  const [errors, setErrors] = useState({})
  const [toggleModal, setToggleModal] = useState(false)
  const [dispatchEvent, setDispatchEvent] = useState(null)
  const [idEdit, setIdEdit] = useState(null)
  const { email, name, status } = form

  // * ________________________________

  // * ______ toggle modal
  const dispatchModal = (status) => {
    setToggleModal(status)
  }
  const hideModal = () => {
    dispatchModal(false)
    resetForm()
  }
  const handleShowModal = () => {
    dispatchModal(true)
  }

  // * _________ reset form

  const resetForm = () => {
    setForm({
      email: '',
      name: '',
      status: '1',
    })
    setErrors({})
    setIdEdit(null)
  }

  const getTodos = async () => {
    const res = await fetch(`${SERVER_API}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    getTodos()
    hideModal()
    return setDispatchEvent(null)
  }, [dispatchEvent])
  
  const addTodo = async (data) => {
    const res = await fetch(`${SERVER_API}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setDispatchEvent('add')
    }
  }

  const upDateTodo = async (data, id) => {
    const res = await fetch(`${SERVER_API}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setDispatchEvent('update')
    }
  }

  const removeTodo = async (id) => {
    const res = await fetch(`${SERVER_API}/todos/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setDispatchEvent('delete')
    }
  }

  const handleChangeValue = (e) => {
    const data = { ...form }
    data[e.target.name] = e.target.value

    setForm(data)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const todo = {
      ...form,
    }
    const newErrors = { ...errors }

    todo.status = todo.status === '1' ? true : false
    todo.name.trim() === ''
      ? (newErrors.name = 'Vui lòng nhập tên!')
      : delete newErrors.name

    todo.email.trim() === ''
      ? (newErrors.email = 'Vui lòng nhập tên!')
      : delete newErrors.email

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      idEdit === null ? addTodo(todo) : upDateTodo(todo, idEdit)
    }
  }

  const handleShowEditForm = async (id) => {
    const res = await fetch(`${SERVER_API}/todos/${id}`)
    const data = await res.json()
    data.status = data.status === true ? '1' : '0'
    setForm(data)
    setIdEdit(id)
    handleShowModal()
  }

  const handleRemoveTodo = (id) => {
    Swal.fire({
      title: 'Chia tay thật à?',
      text: 'Em sẽ không còn thấy anh nữa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok, Chia tay!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeTodo(id)
        Swal.fire('Đã Chia Tay!', 'Hahaha.', 'success')
      }
    })
  }

  return (
    <div className="container mt-5">
      <h1>Danh sách công việc</h1>
      <button
        type="button"
        className="btn btn-primary my-4"
        onClick={handleShowModal}
      >
        Thêm công việc
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="5%">STT</th>
            <th>Tên công việc</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th width="5%">Sửa</th>
            <th width="5%">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ name, email, status, id }, index) => {
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <a
                    href="#"
                    className={`btn btn-${
                      status === true ? 'success' : 'danger'
                    }`}
                  >
                    {status === true ? 'Active' : 'Inactive'}
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault()
                      handleShowEditForm(id)
                    }}
                  >
                    Sửa
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveTodo(id)
                    }}
                  >
                    Xóa
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal show={toggleModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="text-center">Thêm công việc</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmitForm}>
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">
                Tên công việc
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={name}
                onChange={handleChangeValue}
              />

              <div className="invalid-feedback">{errors?.name}</div>
            </div>

            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={email}
                onChange={handleChangeValue}
              />
              <div className="invalid-feedback">{errors?.email}</div>
            </div>

            <div className="mb-3">
              <select
                id=""
                className="form-select"
                name="status"
                value={status}
                onChange={handleChangeValue}
              >
                <option value="1">Kích hoạt</option>
                <option value="0">Chưa kích hoạt</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              Lưu
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Todos
