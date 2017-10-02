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

const CustomForm = ( title, formBlocks ) => { 
    return (
	<div>
	    <h2>{title}</h2>
	    <Form type="horizontal">
	    {
		formBlocks.map(CustomFormBlock)
	    }
	    </Form>
	</div>
    );
}

/* pre: formBlock
 * formBlock - dictionary with keys : "title", "data"
 * data - array of dictionaries representing fields
 * dictionary keys : {
 *  "label" , "type" , "placeholder", "name", "activate"
 * }
 * todo: check for more specific types
**/
//const DefaultCustomForm = ( label, type, placeholder, active) => {

const CustomFormBlock = ( formBlock ) => {
    //put any header information here
    //todo : add meta information option
    let retBlock = formBlock["title"] ?
	(<div>
	  <h3> {formBlock["title"]} </h3>    
          {formBlock["data"].map(FieldEntry)}
	 </div>)
	: (<div>
	   {formBlock["data"].map(FieldEntry)}
	    </div>);
    return retBlock;

};

const FieldEntry = ( entryData ) => {
    let curInput;
    if (entryData["activate"] == "true") {
        curInput = <FormInput autoFocus type={entryData["type"]} placeholder={entryData["placeholder"]} name={entryData["name"]} />;
    } else {
        curInput = <FormInput type={entryData["type"]} placeholder={entryData["placeholder"]} name={entryData["name"]} />;
    }
    return (
        <FormField label={entryData["label"]} htmlFor={entryData["name"]}>
            {curInput}
        </FormField>
    );
};

export default CustomForm;
