import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class Heder extends Component {
    //验证项
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }
    //传递给TodoTextInput 的方法
    handleSave = text => {
        if(text.length !== 0) {
            this.props.addTodo(text)
        }
    } 
    //使用 TodoTextInput组件
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput  newTodo
                                onSave={this.handleSave}
                                placeholder="What needs to be done?" />
            </header>
        )
    }
}