import React,{Component} from 'react';
import {Form} from 'semantic-ui-react';

const roles = [
	{
		text: 'Participant',
		value: 'participant'
	}, {
		text: 'Volunteer',
		value: 'volunteer'
	}, {
		text: 'Admin',
		value: 'admin'
	}
];

export default class ECRole extends Component {
	constructor(props){
		super(props);
	}

    render() {
		const {onChange, onClick, onClose, onFocus} = this.props;
        return (
			<Form.Dropdown
				name='role'
				label='Role'
				style={{marginBottom: '15px'}}
				placeholder='Select Role'
				fluid
				selection
				options={roles}
				closeOnChange={true}
				onChange={onChange}
				{...this.props}
			/>
        );
    }
}
