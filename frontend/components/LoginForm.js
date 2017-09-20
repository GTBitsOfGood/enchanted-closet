import React from 'react';
import PropTypes from 'prop-types';
import CustomForm from 'CustomForm';

const LoginForm = () => {
    let customFormData = [];
    customFormData.push({
	"label": "Email",
	"type": "email",
	"name": "email",
	"placeholder": "Email",
	"activate": "true"
    });
    customFormData.push(
	"label": "Password",
	"type": "password",
	"name": "password",
	"placeholder": "Password",
	"activate": "false"
    );
    return CustomForm(customFormData);
};

export default LoginForm;
