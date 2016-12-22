import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


const store = createStore(reducer)

//使用Provider 将store暴露给组件
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
