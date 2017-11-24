import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

const SURVEY_DIR = '../static/surveys/';

let data = {};

import SurveyForm from '../static/surveys/SurveyFormJSON.js';
import LoginForm from '../static/surveys/LoginFormJSON.js';
import RegisterForm from '../static/surveys/RegisterFormJSON.js';

const FileForm = ( props ) => {
    let clickHandler = (data) => {
        if (props.onClick !== undefined) props.onClick(data);
        return;
    }
    switch ( props.type ) {
    case "survey":
        return CustomForm(SurveyForm.SurveyForm, clickHandler);
        break;
    case "login":
        return CustomForm(LoginForm.LoginForm, clickHandler);
        break;
    case "register":
        return CustomForm(RegisterForm.RegisterForm, clickHandler);
        break;
    }

    return CustomForm(null, clickHandler);
}


//Todo: add display config
/* pre: props
 * props - dictionary with form data
 * dictionary keys : {
 * "title", "data", "misc", "type"
 * }
 * Each 'data' is formBlock
**/
const CustomForm = ( props, buttonAction ) => {
    return (
    <div>
        <h2>{props.title}</h2>
        <Form>
            {
                props.data.map(CustomFormBlock)
            }
             <Button primary onClick={() => buttonAction(Object.assign({}, data))}>{props.button}</Button>
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
            <div key={props.title}>
                <h3> {props.title} </h3>
                {props.data.map(FieldEntry)}
            </div>
        )
    } else {
        return props.data.map(FieldEntry)
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

export default FileForm;
