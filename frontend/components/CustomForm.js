import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormInput, FormField } from 'elemental';


//Todo: add display config
/* pre: title, formBlocks
 * title - Header for form
 * formBlocks - array of dictionaries
 * dictionary keys : {
 * "title", "data", "misc", "type"
 * }
 *
**/

const CustomForm = ( props ) => { 
    return (
	<div>
	    <h2>{props.title}</h2>
	    <Form type="horizontal">
	    {
		props.formBlocks.map(CustomFormBlock)
	    }
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

export default CustomForm;
