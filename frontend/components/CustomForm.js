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


//NOTES: uncomment dispatces for saving and loading, add proper routes
class CustomForm extends Component {    
    constructor(props) {
	super(props);
	this.state = {
	    formValues: flatten(props.data), //note: props.data only holds labels, not actual data
	    changedValues: {}
	};
	this.clickHandler = this.clickHandler.bind(this);
	this.changeHandler = this.changeHandler.bind(this);
    }
    
    componentDidMount() {
	const { dispatch } = this.props;
	//dispatch(fetchFormData(this.props.loadRoute)); gets data into store
    }

    componentWillReceiveProps(nextProps) {
	//convert db keynames to form keynames (nonfucntional)
	const { newValues } = nextProps; //has key (LABEL) val (VALUE) for each entry
	//append section to label for easier processing
	let newKeyDict = {}
	for (let key in this.state.formValues) {
	    let newKey = key.split("|")[1]; //get second half
	    newKeyDict[key] = newKey;
	} 
	let processedValues = {}	
	for (let key in newValues) {
	    processedValues[newKeyDict[camelCasedToSpaced(key)]] = newValues[key]	    
	}
	console.log(processedValues);
	
	this.setState({ formValues: processedValues })
    }
    
    clickHandler() {
	if (this.props.submitRoute != undefined) {
	    //strip section labels and convert keys to db keynames
	    let dbValues = {}
	    
	    for (let key in this.state.changedValues) {
		let newKey = spacedToCamelCase(key.split("|")[1])
		dbValues[newKey] = this.state.changedValues[key] //probably still not right ie. Emergency Contact Name => emerContactName (Hardcode needed)
	    }
	    console.log(dbValues);
	    //dispatch(saveFormData(props.submitRoute, dbValues))
	    this.setState({ changedValues: {}}) //ideally this is reset on server confirm save
	}
    }
    
    changeHandler(event) {
	let dictKey = event.target.name
	let newVal = event.target.value
	this.setState({changedValues: Object.assign(this.state.changedValues, {[dictKey]: newVal})})
	this.setState({formValues: Object.assign(this.state.formValues, {[dictKey]: newVal})})
    }

    render() {
	console.log(this.props);
	const { formValues } = this.state;
	let formValHardcode = {
	    //hardcode test
	    "Bio|Name": "Joel Ye",
	    "Bio|Email": "joelye9@gmail.com",
	    "Bio|Phone Number": 7187558248,
	    "Bio|Birthday": "1999-09-09", //must be formatted as such
	    "Bio|Grade": 12,
	    "Bio|Age": 18,
	    "Bio|Race/Ethnicity": "Asian",
	    "Affiliations|School": "Enchanted Closet",
	    "Affiliations|Leader": "Joe Torraca",
	    "Emergency|Emergency Contact Name": "John Doe",
	    "Emergency|Emergency Contact Relation": "Stranger",
	    "Emergency|Emergency Contact Phone": 1111111111
	};
	
	const { title, displayType, button, data, dispatch } = this.props;
	
	enhance(data, formValues); //enhance(data, formValues);
	
	return (
	    <div>
		<h2>{ title }</h2>
		<Form>
		    {
			data.map((d) => <CustomFormBlock key={title + d.title} displayType={displayType} data={d} changeHandler={this.changeHandler} />)
		    }
		    <Button primary onClick={this.clickHandler}>{button}</Button>
		</Form>
	    </div>
	);
    }
}

const FileForm = ( props ) => {
    const { submitRoute } = props;
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
	    break;
    }
    formProps["displayType"] = props["isInline"] === "true" ? 'inline' : 'form';
    return <CustomForm {...formProps} clickHandler={submitRoute} />;
}

/* flatten: turns data into dictionary keyset (empty str values) with group:label
 * General purpose implementation...?
 * pre: data - array of customformblocks
 * post: dict with keys of form labels, empty string val
 */
const flatten = (data) => {
    return data
	.reduce((total, curData) =>
	    Object.assign(total, curData.data //why won't spread syntax work...
					.reduce((total, d) => Object.assign(total, {[curData.title+ "|" + d.label]:""}), {})), 
		{});
}

//reverse of flatten
const enhance = (formDict, valueDict) => { //assigns value from valueDict to corresponding entry in formDict
    for (let value in valueDict) {
	let route = value.split("|")
	for (let i = 0; i < formDict.length; i++) {
	    if (formDict[i]["title"] === route[0]) {
		for (let j = 0; j < formDict[i].data.length; j++) {
		    if (formDict[i].data[j]["label"] === route[1]) {
			formDict[i].data[j]["value"] = valueDict[value]
			j = formDict[i].data.length //break
		    }
		}
		i = formDict.length
	    }
	}
    }
}


const spacedToCamelCase = (s) => {
    let arr = s.split(" ");
    arr[0] = arr[0].toLowerCase();
    for (let i = 1; i < arr.length; i++) {
	arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join('')
}

const camelCaseToSpaced = (s) => {
    let arr = s.split(new RegExp("[A-Z]"));
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1)
    return arr.join(" ")
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
    const { data, displayType, changeHandler } = props
    if (data.title) {
	return (	    
		<div key={data.title}>
                    <h3> {data.title} </h3>    
                    {data.data.map((d) => <FieldEntry key={data.title+d.label} formKey ={data.title+"|"+d.label} data={d} displayType={displayType} changeHandler={changeHandler} />)}
		</div>
        )
    } else {
        return (
	    <div>
		{data.data.map((d) => <FieldEntry key={d.label} formKey={d.label} data={d} displayType={displayType} />)}
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
    const { data, displayType, changeHandler , formKey } = props
    globalData[data.label.toLowerCase()] = ''    
    //todo: change to spread syntax
    return (
        <Form.Input focus={data.activate != null ? true : false}
		    className={displayType === "form" ? null : "inline"}
		    key={data.label+data.type}
		    label={data.label}
	            name={formKey} 
		    type={data.type}
		    placeholder={data.placeholder}
		    onChange={changeHandler}
		    value={data.value}
	/>
    )
};

module.exports = {FileForm, CustomForm};
