import React, { PropTypes, Component } from 'react'
import Input from './input'

class InputGroup extends Component {
	construtor() {
		super()
	}

	render() {
		<div>
		{lists.map(function(index,list){
			return <Input  key={index} labelName="{list}" />
		})
		}
		</div>
	}
}

InputGroup.PropTypes = {
	lists: PropTypes.arrayOf.shape({
		labelName: PropTypes.string.isRequired
	}).isRequired
}