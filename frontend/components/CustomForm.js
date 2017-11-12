import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

const SURVEY_DIR = '../static/surveys/';

let data = {};

import SurveyForm from '../static/surveys/SurveyFormJSON.js'; 
import LoginForm from '../static/surveys/LoginFormJSON.js';
//import RegisterForm from '../static/surveys/RegisterFormJSON.js';

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
    }
    formProps["type"] = props["isForm"] ? 'form' : 'inline';
    return CustomForm(formProps, clickHandler);
}


//Todo: add display config
/*
 * pre: props
 * props - dictionary with form data
 * dictionary keys : {
 * "title", "data", "misc", "type"
 * }
 * Each 'data' is formBlock
 */
const CustomForm = ( props, buttonAction ) => {	
    return (
    <div>
        <h2>{props.title}</h2>
        <Form>
            {
                props.data.map((d) => {
		    CustomFormBlock(d, props.type)
		})
            }
             <Button primary onClick={() => buttonAction(Object.assign({}, data))}>{props.button}</Button>
        </Form>
    </div>
    );
}


/* pre: props, isForm
 * isForm - determines if fieldEntry is inline
 * props.title - header of input group
 * props.data - array of dictionaries representing fields
 * dictionary keys : {
 *  "label" , "type" , "placeholder", "name", "activate"
 * }
 * todo: check for more specific types
**/
//const DefaultCustomForm = ( label, type, placeholder, active) => {
const CustomFormBlock = ( props, formType ) => {
    //put any header information here
    //todo : add meta information option
    //const fieldEntryFunc = formType === 'form' ? FieldEntry : FieldEntryInline
    console.log(formType)
    if (props.title) {
        return (
            <div key={props.title}>
                <h3> {props.title} </h3>    
                {props.data.map(FieldEntry)}
            </div>
        )
    } else {
        return (
	    <div>
	    props.data.map(FieldEntry)
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
    data[props.label.toLowerCase()] = '';
    
    if (props.activate) {
        return (
            <Form.Input focus key={props.label+props.type} label={props.label} type={props.type} placeholder={props.placeholder} onChange={e => (data[props.label.toLowerCase()] = e.target.value)}/>
        )
    } else {
        return (
            <Form.Input key={props.label+props.type} label={props.label} type={props.type} placeholder={props.placeholder} onChange={e => (data[props.label.toLowerCase()] = e.target.value)}/>
        )
    }
};


/* FieldEntryInline - Inline display of form with editable html (todo : give isEdited state? 
 * pre : see FieldEntry
 * NOT WORKING RN
 */
const FieldEntryInline = (props) => {
    data[props.label.toLowerCase()] = '';
    return (
	<p key={props.label+props.type}>{props.label} :<span contenteditable="true">{props.placeholder}</span></p>
    );
}

export default FileForm;
