import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';


const SURVEY_DIR = '../static/surveys/';

let globalData = {};

import SurveyForm from '../static/surveys/SurveyFormJSON.js'; 
import LoginForm from '../static/surveys/LoginFormJSON.js';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';
//import RegisterForm from '../static/surveys/RegisterFormJSON.js';



//Todo: add display config
/*
 * pre: props
 * props - dictionary with form data
 * dictionary keys : {
 * "title", "data", "type", "button"
 * }
 * Each 'data' is formBlock
 */

class CustomForm extends Component {

    constructor(props) {
        super(props);	
    }
    
    componentDidMount() {
	const { dispatch } = this.props;
	//dispatch(fetchProfile()); gets data into store
    }

    componentWillReceiveProps(nextProps) {
	const { newValues } = nextProps; //has key (LABEL) val (VALUE) for each entry
	this.setState({ formValues: newValues })
    }

    //const CustomForm = ( props, buttonAction, onFieldChange ) => {
    //const { title, button, displayType } = props;
    render() {
	const { formValues } = this.state;
	const FormData = props;
	FormData["isInline"] = "true";
	const clickHandler = (data) => {
            if (props.onClick !== undefined) props.onClick(data);
            return;
	}
	//flatten formdata and insert profile values
	let newAccess = Object.assign({}, this.state.access, {hospital_id:1});
	this.setState({access: newAccess});
	
	return (
	    <div>
		<h2>{ title }</h2>
		<Form>
		    {
			props.data.map((d) => <CustomFormBlock key={title + d.title} displayType={displayType} data={d} onChange={onFieldChange} />)	
		    }
		    <Button primary onClick={() => buttonAction(Object.assign({}, data))}>{button}</Button>
		</Form>
	    </div>
	);
    }
}

const FileForm = ( props ) => {
    let clickHandler = (data) => {
        if (props.onClick !== undefined) props.onClick(data);
        return;
    }
    let formProps = null;
    switch ( props.type ) {
	case "survey":
	    formProps = SurveyForm.SurveyForm
            break;
	case "login":
	    formProps = LoginForm.LoginForm
            break;
	case "register":
	    formProps = RegisterForm.RegisterForm
            break;
	case "profile":
	    formProps = ProfileForm.ProfileForm
	    break;
	default:
	    formProps = {}
	    console.log(props.type)
	    break;
    }
    formProps["displayType"] = props["isInline"] === "true" ? 'inline' : 'form';
    return <CustomForm {...formProps} clickHandler={clickHandler}>;
}


/* pre: props, isForm
 * isForm - determines if fieldEntry is inline
 * props.title - header of input group
 * props.data - array of dictionaries representing fields
 * dictionary keys : {
 *  "label" , "type" , "placeholder", "name", "activate" (optional), "value" (optional)
 * }
 * todo: check for more specific types
 **/
//const DefaultCustomForm = ( label, type, placeholder, active) => {
const CustomFormBlock = ( props ) => {
    //put any header information here
    //todo : add meta information option
    const { data, displayType, onChange } = props
    if (data.title) {
        return (	    
		<div key={data.title}>
                    <h3> {data.title} </h3>    
                    {data.data.map((d) => <FieldEntry key={data.title+d.label} data={d} displayType={displayType} onChange={(d) => onChange(d.label)} />)}
		</div>
        )
    } else {
        return (
	    <div>
		data.data.map(FieldEntry)
	    </div>
	);
    }
};

/* pre : props
 * props.activate - whether to activate onload
 * props.type
 * props.placeholder
 * props.name
 * props.label
 */
const FieldEntry = ( props ) => {
    const { data, displayType, onChange } = props
    globalData[data.label.toLowerCase()] = ''    

    //todo: change to spread syntax
    return (
        <Form.Input focus={data.activate != null ? true : false}
		    className={displayType === "form" ? null : "inline"}
		    key={data.label+data.type}
		    label={data.label} 
		    type={data.type}
		    placeholder={data.placeholder}
		    onChange={data.onChange}
		    value={data.value}
	/>
    )
};

module.exports = {FileForm, CustomForm};
