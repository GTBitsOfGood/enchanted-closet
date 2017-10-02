import React from 'react';
import PropTypes from 'prop-types';
import CustomForm from '../components/CustomForm';

const LoginForm = () => {
    let formTitle = "Login";
    let customFormData = [];
    
    let loginGroup = {	
	"data" : []
    };
    loginGroup["data"].push({
        "label": "Email",
        "type": "email",
        "name": "email",
        "placeholder": "Email",
        "activate": "true"
    });
    loginGroup["data"].push({
    	"label": "Password",
    	"type": "password",
    	"name": "password",
    	"placeholder": "Password"
    });

    customFormData.push(loginGroup);
    return <CustomForm title={formTitle} formBlocks={customFormData} />;
};

export default LoginForm;
