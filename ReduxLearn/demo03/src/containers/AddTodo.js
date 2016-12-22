import React from  'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
    //使用JSX 发现不用分号 ref 可以获取节点
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
// 这样才可以 在 <Provider></Provider> 里面使用
// 将木偶组件转化为容器组件 connect(mapStateToProps(state,props), mapDispatchToProps(dispatch,props))
// 假如里面不添加 mapStateToProps 不会更新UI, 所以这个组件UI不会更新
AddTodo = connect()(AddTodo)
export default AddTodo
