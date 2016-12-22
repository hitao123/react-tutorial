import React,{PropTypes} from 'react'
 
const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick}
    //react 样式写法 驼峰命名 className
    style={{textDecoration: completed ? 'line-through': 'none'}}>
       {text} 
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired 
}
export default Todo
