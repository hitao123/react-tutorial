import React, { Component, PropTypes } from 'react'

class Counter extends Component {
	//ES7 静态属性，ES6只要静态方法，不需要实例化可以直接调用
	static PropTypes = {
		value: PropTypes.number.isRequired,
		onIncrement: PropTypes.func.isRequired,
		onDecrement: PropTypes.func.isRequired
	}

	IncrementByOdd = () => {
		if(this.props.value % 2 !== 0){
			this.props.onIncrement();
		}
	}

	IncrementAsync = () => {
		setTimeout(this.props.onIncrement,2000);
	}
	render() {
		const {value, onDecrement, onIncrement} = this.props;
		return (
			<div>
				<div>
					click {value} times!
					<button onClick={onIncrement}>Increment</button>
					<button onClick={onDecrement}>Decrement</button>
					<button onClick={this.IncrementByOdd}>IncrementByOdd</button>
					<button onClick={this.IncrementAsync}>IncrementAsync</button>
				</div>
			</div>
		)
	}
}
export default Counter