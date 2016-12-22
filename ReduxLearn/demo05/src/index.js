import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
 
}
//...扩展运算符将数组转换为参数  
//applyMiddleware 会将中间件放在一个数组里面，中间件放置位置有讲究，logger 就只能放在最后一个
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
    	<App />
    </Provider>,
    document.getElementById('root')
)
