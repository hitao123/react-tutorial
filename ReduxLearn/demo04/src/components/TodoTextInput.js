import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
    //验证项，还有另外一种写法参照demo3
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        editing: PropTypes.bool,
        newTodo: PropTypes.bool
    }
    //设置初始状态
    state = {
        text: this.props.text || ''
    }
    //处理键盘按下事件，当敲击回车键，dipatch,在列表中渲染出来
    handleSubmit = e => {
        const text = e.target.value.trim()
        if(e.which === 13) { //按回车键
            this.props.onSave(text)
            if(this.props.newTodo) { //默认为 true
                this.setState({ text: '' })
            }
        }
    }
    //处理 onChange 事件，假如这里不处理的话，state未更新，你会发现“无法输入”
    handleChange = e => {
        this.setState({ text: e.target.value })
    }
    //处理失去焦点是事件
    handleBlur = e => {
        if(!this.props.newTodo){
            this.props.onSave(e.target.value)
        }
    }
    //每一个组件里面必须实现的函数
    render() {
        return (
            <input type="text" className={
                classnames({
                    edit: this.props.editing,
                    'new-todo': this.props.newTodo
                })
            }
            autoFocus="true"  
            placeholder={this.props.placeholder} 
            onBlur={this.handleBlur} 
            onChange={this.handleChange} 
            onKeyDown={this.handleSubmit} />
        )
    }

}


