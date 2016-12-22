import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
// 使用 combineReducers 可以将里面的对象属性放在 state 里面
const todoApp = combineReducers({
	todos,
	visibilityFilter
})

export default todoApp
