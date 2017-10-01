import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormInput, FormField } from 'elemental';

/* pre: data
* data - array of dictionaries representing fields
* dictionary keys : {
*  "label" , "type" , "placeholder", "name"
* }
* todo: check for more specific types
*/
const CustomForm = (  data  ) => {
    //put any header information here
    return (
        <Form>
            {
                data.map(FieldEntry)
            }
        </Form>
    );

};

const FieldEntry = ( entryData ) => {
    let curInput;
    if (entryData["activate"] == "true") {
        let curInput = <FormInput autoFocus type={entryData["type"]} placeholder={entryData["placeholder"]} name={entryData["name"]} />;
    } else if (entryData["activate"] == "false") {
        let curInput = <FormInput type={entryData["type"]} placeholder={entryData["placeholder"]} name={entryData["name"]} />;
    }
    return (
        <FormField label={entryData["label"]} htmlFor={entryData["name"]}>
            {curInput}
        </FormField>
    );
};

//Type checking
CustomForm.propTypes = {

};

//example
// pre: login, pass in dictionary
const LoginForm = () => {
    let customFormData = [];
    customFormData.push({
        "label": "Email",
        "type": "email",
        "name": "email",
        "placeholder": "Email",
        "activate": "true"
    });
    customFormData.push({
        "label": "Password",
        "type": "password",
        "name": "password",
        "placeholder": "Password",
        "activate": "false"
    });
    return CustomForm(customFormData);
};

export default LoginForm;
