import { combineReducers } from 'redux'
import {
    SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedReddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit
        default:
            return state
    }
}
//使用对象扩展运算符 后面的同名属性会覆盖前面的同名属性 posts = {isFetching: false,didInvalidate: false,items: [],lastUpdated: action.receivedAt}
//// isFetching 表示正在获取 didInvalidate 表示数据已经过期
const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
          return {
            ...state,
            didInvalidate: true
          }
        case REQUEST_POSTS:
          return {
            ...state,
            isFetching: true,
            didInvalidate: false
          }
        case RECEIVE_POSTS:
          return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt
          }
        default:
          return state
    }
}

const postsByReddit = (state = { }, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
          return {
            ...state,
            [action.reddit]: posts(state[action.reddit], action)
          }
        default:
          return state
  }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
})

export default rootReducer
