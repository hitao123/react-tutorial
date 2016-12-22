import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
//不一定所有的都需要通过class 去继承 Component ，返回一段JSX也是可以的
const App = () => (
	<div>
		<AddTodo/>
		<VisibleTodoList/>
		<Footer/>
	</div>

)
//每一个js文件里面只允许有一个export default 导入的时候可以不加挎号，任意命名
export default App
