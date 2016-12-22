import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

//ES6属性名表达式
const TODO_FILTER = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSetion extends Component {
    static propsTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    state = {
        filter: SHOW_ALL
    }

    handleClearCompleted = () => {
        //这里由于之前使用bindActionCreators() 将会直接dispatch action
        this.props.actions.clearCompleted()
    }

    handleShow = filter => {
        this.setState({ filter })
    }

    renderToggleAll = completedCount => {
        const { todos, actions } = this.props
        if(todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }

    renderFooter = completedCount => {
        const { todos } = this.props
        const { filter } = this.state
        const activeCount = todos.length - completedCount

        if(todos.length) {
            return (
                <Footer 
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    onClearCompleted={this.handleClearCompleted.bind(this)}
                    onShow={this.handleShow.bind(this)}
                    />
            )
        }
    }

    render () {
        const { todos, actions } = this.props
        const { filter } = this.state
        const filterTodos = todos.filter(TODO_FILTER[filter])
        const completedCount = todos.reduce((count,todo) => todo.completed ? count+1: count , 0)

        return (
            <setion className="main">
                {this.renderToggleAll(completedCount)}
                <ul className="todo-list">
                   {filterTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...actions}/>)} 
                </ul>
                {this.renderFooter(completedCount)}
            </setion>
        )

    }
}

