import React from  'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
    let input 
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return 
                }
                dispatch(addTodo(input.value))
                input.value = ''
            }}>
                <input ref={node => {
                    input = node
                }}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
// 这里需要使用 react-redux connect() 方法将其转化为container Component
// 这样才可以 在 <Provider></Provider>里面使用
AddTodo = connect()(AddTodo)
export default AddTodo
