const todo = (state, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            //id 是在 reducer 产生。用的是ADD_TODO , action.id 是传给action的
            if(state.id !== action.id){
                return state
            }
            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state
    }
}
// 这里返回一个列表状态，初始状态为空
// state = [{id: 1,text: "qwq", complete: true},{...}]
// 这里遇到一个疑问的地方就是 ...state 数组的扩展运算符

const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined,action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t,action)
            )
        default:
            return state
    }
}




export default todos




