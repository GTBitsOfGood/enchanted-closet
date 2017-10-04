import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormInput, FormField, Button } from 'elemental';

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
    console.log(props);
    return (
	<div>
	<h2>{props.title}</h2>
	    <Form type="horizontal">
	    {
	        props.data.map(CustomFormBlock)
	    }
	         <Button>{props.button}</Button>
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
    let retBlock = props.title ?
	(<div>
	  <h3> {props.title} </h3>    
          {props.data.map(FieldEntry)}
	 </div>)
	: (<div>
	   {props.data.map(FieldEntry)}
	    </div>);
    return retBlock;

};

/* pre : props
 * props.activate - whether to activate onload
 * props.type
 * props.placeholder
 * props.name
 * props.label
 */
const FieldEntry = ( props ) => {
    let curInput;
    if (props.activate) {
        curInput = <FormInput autoFocus type={props.type} placeholder = {props.placeholder} name={props.name} />;
    } else {
        curInput = <FormInput type={props.type} placeholder={props.placeholder} name={props.name} />;
    }
    return (
        <FormField label={props.label} htmlFor={props.name}>
            {curInput}
        </FormField>
    );
};

export default FileForm;
