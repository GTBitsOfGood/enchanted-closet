import React from 'react';
import PropTypes from 'prop-types';
// import { Form, FormInput, FormField, Button } from 'elemental';
import { Button, Form } from 'semantic-ui-react';

const SURVEY_DIR = '../static/surveys/';

import SurveyForm from '../static/surveys/SurveyFormJSON.js'; 
import LoginForm from '../static/surveys/LoginFormJSON.js';
//import RegisterForm from '../static/surveys/RegisterFormJSON.js';

const FileForm = ( props ) => {
    switch ( props.type ) {
    case "survey":	
    	return CustomForm(SurveyForm.SurveyForm);
    	break;
    case "login":
    	return CustomForm(LoginForm.LoginForm);
    	break;
    case "register":
        return CustomForm(RegisterForm.RegisterForm);
        break;
    }
    
    return CustomForm(null);
}


//Todo: add display config
/* pre: props
 * props - dictionary with form data
 * dictionary keys : {
 * "title", "data", "misc", "type"
 * }
 * Each 'data' is formBlock
**/
const CustomForm = ( props ) => {
    return (
	<div>
    	<h2>{props.title}</h2>
	    <Form>
            {
                props.data.map(CustomFormBlock)
            }
	         <Button primary>{props.button}</Button>
	    </Form>
	</div>
    );
}

/* pre: props
 * props.title - header of input group
 * props.data - array of dictionaries representing fields
 * dictionary keys : {
 *  "label" , "type" , "placeholder", "name", "activate"
 * }
 * todo: check for more specific types
**/
//const DefaultCustomForm = ( label, type, placeholder, active) => {

const CustomFormBlock = ( props ) => {
    //put any header information here
    //todo : add meta information option
    if (props.title) {
        return (
            <div>
                <h3> {props.title} </h3>    
                {props.data.map(FieldEntry)}
            </div>
        )
    } else {
        return (
            <div>
                {props.data.map(FieldEntry)}
            </div>
        )
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
    if (props.activate) {
        return (
            <Form.Input focus label={props.label} type={props.type} placeholder={props.placeholder} />
        )
    } else {
        return (
            <Form.Input label={props.label} type={props.type} placeholder={props.placeholder} />
        )
    }
};

export default FileForm;
