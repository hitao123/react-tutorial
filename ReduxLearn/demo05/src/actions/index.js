export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

//选择 selectReddit 
export const selectReddit = reddit => ({
	type: SELECT_REDDIT,
	reddit
})

//无效 invalidateReddit
export const invalidateReddit = reddit => ({
	type: INVALIDATE_REDDIT,
	reddit
})
//请求 reqestPosts
export const requestPosts = reddit => ({
	type: REQUEST_POSTS,
	reddit
})

//接收 receivePosts 
export const receivePosts = (reddit, json) => ({
	type: RECEIVE_POSTS,
	reddit,
	posts: json.data.children.map(child => child.data),
	receivedAt: Date.now()
})
//使用fetch 获得数据 返回 promise对象 ES6插值 这里发出两个 action
// 返回的是一个函数参数 是dispatch ，action creator 所以这里会用到 react-thunk
// 这里dispatch(action) 这里返回一个参数是dispatch()的函数
// applyMiddler返回值会改变 dispatch, store 不会改变
const fetchPosts = reddit => dispatch => {
	dispatch(requestPosts(reddit))
	return fetch(`https://www.reddit.com/r/${reddit}.json`)
		.then(response => response.json())
		.then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
	const posts = state.postsByReddit[reddit]
	if (!posts) {
		return true
	}
	if (posts.isFetching) {
		return false
	}
	return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
	if (shouldFetchPosts(getState(), reddit)) {
		return dispatch(fetchPosts(reddit))
	}
}
