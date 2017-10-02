import React from 'react';
import PropTypes from 'prop-types';
import CustomForm from '../components/CustomForm';

const SurveyForm = () => {
    let formTitle = "Participant Survey";
    let customFormData = [];

    let genGroup = {
	"title" : "Who are you?",
	"data" : []
    };
    genGroup["data"].push({
	"label": "Name",
	"type": "text",
	"name": "name",
	"placeholder": "George P. Burdell",
	"activate": "true"
    });
    genGroup["data"].push({
        "label": "Email",
        "type": "email",
        "name": "email",
        "placeholder": "gburdell@gatech.edu",
    });

    let miscGroup = {
	"title" : "Some details",
	"data" : []
    }

    miscGroup["data"].push({
	"label": "Phone Number",
	"type": "number",
	"name": "phone",
	"placeholder": "1234567890",
    });
    miscGroup["data"].push({
	"label": "Birthday",
	"type": "number", //will fix
	"name": "birthday",
	"placeholder": "01/01/2000"
    });    
    miscGroup["data"].push({
	"label": "Grade",
	"type": "number",
	"name": "grade",
	"placeholder": "10"
    });
    miscGroup["data"].push({
	"label": "Age",
	"type": "number",
	"name": "age",
	"placeholder": "16"
    });
    miscGroup["data"].push({
	"label": "Race/Ethnicity",
	"type": "text",
	"name": "race",
	"placeholder": "Race"
    });

    let affilGroup = { //affiliate details
	"title" : "Affiliations",
	"data" : []
    }
    
    affilGroup["data"].push({
	"label": "School",
	"type": "text",
	"name": "school",
	"placeholder": "Atlanta High School"
    });
    affilGroup["data"].push({
	"label": "Leader",
	"type": "text",
	"name": "leader",
	"placeholder": "A Non"
    });

    let emerGroup = { //emergency details
	"title" : "Emergency",
	"data" : []
    };
    
    emerGroup["data"].push({
	"label": "Emergency Contact Name",
	"type": "text",
	"name": "emergencyContactName",
	"placeholder": "EC Name"
    });
    emerGroup["data"].push({
	"label": "Emergency Contact Phone", 
	"type": "number",
	"name": "emergencyContactPhone",
	"placeholder": "EC Phone"
    });
    emerGroup["data"].push({
	"label": "Emergency Contact Relation",
	"type": "text",
	"name": "emergencyContactRelation",
	"placeholder": "EC Relation"
    });

    customFormData.push(genGroup);
    customFormData.push(miscGroup);
    customFormData.push(affilGroup);
    customFormData.push(emerGroup);
    return CustomForm(formTitle, customFormData);
};

export default SurveyForm;
