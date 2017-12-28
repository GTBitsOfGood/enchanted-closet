import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Button, Form } from 'semantic-ui-react';
import Radium from 'radium';

const SURVEY_DIR = '../static/surveys/';

let data = {};

import SurveyForm from '../static/surveys/SurveyFormJSON.js';
import LoginForm from '../static/surveys/LoginFormJSON.js';
import RegisterForm from '../static/surveys/RegisterFormJSON.js';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';



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

	console.log(props.data);

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

		// this.setState({ formValues: processedValues });
	}

	clickHandler() {
		const { buttonAction, submitRoute } = this.props;
		const { changedValues } = this.state;
		console.log(this.state);
		if (submitRoute != undefined) {
			let formData = {}
			switch (submitRoute) { //determines what gets fed to buttonAction
				case "profile":
					for (let key in changedValues) {
						let newKey = spacedToCamelCase(key.split("|")[1])
						formData[newKey] = changedValues[key] //probably still not right ie. Emergency Contact Name => emerContactName (Hardcode needed)
					}
				break;

				default:
					for (let key in changedValues) {
						let newKey = spacedToCamelCase(key)
						formData[newKey] = changedValues[key]
					}
					break;
		}
		console.log("Sending off formData");
		console.log(formData);
		//strip section labels and convert keys to db keynames
		buttonAction(formData);
		//dispatch(saveFormData(props.submitRoute, dbValues))
		// this.setState({ changedValues: {}}) //ideally this is reset on server confirm save
		}
	}

	changeHandler(event) {
		console.log(event);
		let dictKey = event.target.name;
		let newVal = event.target.value;
		this.setState({
			formValues: Object.assign(this.state.formValues, {[dictKey]: newVal}),
			changedValues: Object.assign(this.state.changedValues, {[dictKey]: newVal})
		});
	}

	render() {
		const { formValues } = this.state;
		const { title, displayType, button, data, dispatch, required } = this.props;
		enhance(data, formValues); //enhance(data, formValues);

		var styles = {
			buttonContainer: {
			padding: '.5em 1em',
			}
		};


		return (
			<Container>
			<h2>{ title }</h2>
			<Form>
				{
				data.map((d) => <CustomFormBlock key={title + d.title} displayType={displayType} data={d} changeHandler={this.changeHandler} required={required.toLowerCase() === 'true'} />)
				}
				<Container textAlign="right" style={styles.buttonContainer}>
				<Button color="violet" onClick={this.clickHandler}>{button}</Button>
				</Container>
			</Form>
			</Container>
		);
	}
}
CustomForm = Radium(CustomForm);

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
	default:
		formProps = {}
		break;
	}
	const { buttonAction, submitRoute } = props;
	formProps["displayType"] = props["isInline"] === "true" ? 'inline' : 'form';
	formProps["required"] = "true";
	return <CustomForm {...formProps} buttonAction={buttonAction} submitRoute={submitRoute}  />;
}

/* flatten: turns data into dictionary keyset (empty str values) with group:label
 * General purpose implementation...?
 * pre: data - array of customformblocks
 * post: dict with keys of form labels, empty string val
 */
const flatten = data => {
	return data
		.reduce((total, curData) =>
			Object.assign(total,
				curData.data.reduce((total, d) => Object.assign(total, {[/*curData.title+ "|" +*/ d.name]:""}), {})),
			{});
}

//reverse of flatten
const enhance = (formDict, valueDict) => { //assigns value from valueDict to corresponding entry in formDict
	for (let value in valueDict) {
		let route = value.split("|")
		for (let i = 0; i < formDict.length; i++) {
		if (formDict[i]["title"] === route[0])
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
const CustomFormBlock = Radium(( props ) => {
	//put any header information here
	//todo : add meta information option
	const { data, displayType, changeHandler, required } = props

	var styles = {
	base: {
		'margin': '1em'
	}
	};
	return (
		<Segment vertical key={data.title} style={styles.base}>
			{data.title && 
			<h3>{data.title}</h3>
			}
			{data.data.map((d) => <FieldEntry key={data.title+d.name} formKey={d.name} data={d} displayType={displayType} changeHandler={changeHandler} required={required} />)}
		</Segment>
	)
});
/* pre : props
 * props.activate - whether to activate onload
 * props.type
 * props.placeholder
 * props.name
 * props.label
 */
const FieldEntry = props => {    
	const { data, displayType, changeHandler , formKey, required } = props
	// console.log(props);
	data[data.label.toLowerCase()] = ''
	// console.log(data);
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
			width={6}
			required={required}
	/>
	)
};

module.exports = {FileForm, CustomForm};
