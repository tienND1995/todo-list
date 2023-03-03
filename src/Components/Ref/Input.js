import React , {forwardRef} from 'react'

function Input(props, ref) {

  return (
    <div>
      <input
        ref={ref}
        type="text"
        name="keyword"
        placeholder="Tìm kiếm..."
      />
    </div>
  )
}

export default forwardRef(Input)