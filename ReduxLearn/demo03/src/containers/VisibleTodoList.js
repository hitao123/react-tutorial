import { connect } from 'react-redux'
import { toggleTodo} from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        default: throw new Error('Unknow filter:' + filter)
    }
}
//每当状态变化，这里都会被调用 相当于订阅 state.subscribe()
const mapStateToProps = (state,ownProps) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = ({
    onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList