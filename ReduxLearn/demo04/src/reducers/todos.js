import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    //添加 state  ...state 是一个包含对象的数组，并将对象合并到一个数组里
    //id 函数就是让id递增 reduce(callback,intialValue) callback(previousValue,currentValue,index,array)
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]
    //删除操作 返回所有 true 的数组元素 过滤
    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )
    //编辑操作 假如编辑已经添加，仅仅更改文本状态，使用一个小技巧，利用ES7 扩展运算符
    //同名 key 进行替换，否则还是原来的值
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )
    //完成操作 在radio 单击时进行状态切换
    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )
    //完成所有  假如所有item 都处于完成状态，将每一个complete 置为 false
    //只要有一个为false, 将所有 置为 true, 就是一个切换
    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    //删选完成的 todo  
    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
