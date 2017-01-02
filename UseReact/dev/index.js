import React from "react";
import { render } from "react-dom";
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router,browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import routes from './config/routes'

const middlewares = [ thunk ];
if(process.env.NODE_ENV !== 'production'){
    middlewares.push(createLogger());
}

const store =  createStore(
    rootReducer,
    applyMiddleware(...middlewares)
)

render(
    <Provider store={store}>
        <Router history={browserHistory} 
                routes={routes}
        />
    </Provider>,
    document.getElementById("container")
);

