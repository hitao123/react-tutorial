import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {
    if(active){
        return <span>{children}</span>
    }
    //每次需要重置默认行为
    return  (
        <a href="#" onClick={e=>{
            e.preventDefault()
            onClick()
        }}>
        {children}
        </a>
    )
} 
//还有一种就是在class 里面使用 static PropTypes ={} 验证 
//  PropTypes 或者 propTypes 都可以
Link.PropTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}


export default Link
