import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
    static propTypes = {
      selectedReddit: PropTypes.string.isRequired,
      posts: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      dispatch: PropTypes.func.isRequired
    }
    //这个方法会在组件加载完毕之后立即执行 selectedReddit
    componentDidMount() {
        const { dispatch, selectedReddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }
    //在组件接收到一个新的prop时被执行。这个方法在初始化render时不会被调用
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
          const { dispatch, selectedReddit } = nextProps
          dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }
    //处理切换状态  发起一个 action
    handleChange = nextReddit => {
        this.props.dispatch(selectReddit(nextReddit))
    }
    //点击刷新按钮 这里发送了两个action 点击刷新会重新请求
    handleRefreshClick = e => {
        e.preventDefault()
        const { dispatch, selectedReddit } = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props
        const isEmpty = posts.length === 0
        return (
          <div>
            <Picker value={selectedReddit}
                    onChange={this.handleChange}
                    options={[ 'reactjs', 'frontend' ]} />
            <p>
              {lastUpdated &&
                <span>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  {' '}
                </span>
              }
              {!isFetching &&
                <a href="#"
                   onClick={this.handleRefreshClick}>
                  Refresh
                </a>
              }
            </p>
            {isEmpty
              ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <Posts posts={posts} />
                </div>
            }
          </div>
        )
    }
}
// 这里为什么 state 前面不需要加上 this ?
const mapStateToProps = state => {
    const { selectedReddit, postsByReddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
    }

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
