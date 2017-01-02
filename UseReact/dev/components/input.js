import React, { PropTypes, Component } from 'react'


export default class Input extends Component {

	construtor() {
		super()
	}

	render() {
		return (
			<div>
				<label>{this.props.labelName}</label>
				<input type="text" />
			</div>
		)
	}
}

Input.PropTypes = {
	labelName: PropTypes.string.isRequired
}