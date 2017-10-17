angular.module('interloop.value.config', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//used to configure which entities are available
.value("entityTypes", {
	'activity': {
		singular: 'Activity',
		plural: 'Activities'
	},
	'opportunity': {
		singular: 'Opportunity',
		plural: 'Opportunities'
	},
	'contact': {
		singular: 'Contact',
		plural: 'Contacts'
	},
	'company': {
		singular: 'Company',
		plural: 'Companies'
	}
	
})

//used to configure which entities are searched in global search
.value("searchEntities", {
	'opportunity': {
		singular: 'Opportunity',
		plural: 'Opportunities'
	},
	'contact': {
		singular: 'Contact',
		plural: 'Contacts'
	},
	'company': {
		singular: 'Company',
		plural: 'Companies'
	},
	'attachment': {
		singular: 'Attachment',
		plural: 'Attachments'
	}
	
})

//
.value("companyTypes", [
	{
		key: 'linkedIn',
		label: 'LinkedIn',
		icon: 'fa fa-linkedin-square'
	},
	{
	    key: 'twitter',
		label: 'Twitter',
		icon: 'fa fa-twitter-square'
	},
	{
		key: 'facebook',
		label: 'Facebook',
		icon: 'fa fa-facebook-square'
	}
])

//used for social types dropdown
.value("contacTypes", [
	{
		key: 'linkedIn',
		label: 'LinkedIn',
		icon: 'fa fa-linkedin-square'
	},
	{
	    key: 'twitter',
		label: 'Twitter',
		icon: 'fa fa-twitter-square'
	},
	{
		key: 'facebook',
		label: 'Facebook',
		icon: 'fa fa-facebook-square'
	}
])

//used for social types dropdown
.value("socialTypes", [
	{
		key: 'linkedIn',
		label: 'LinkedIn',
		icon: 'fa fa-linkedin-square'
	},
	{
	    key: 'twitter',
		label: 'Twitter',
		icon: 'fa fa-twitter-square'
	},
	{
		key: 'facebook',
		label: 'Facebook',
		icon: 'fa fa-facebook-square'
	}
])

//used for email types dropdown
.value("emailTypes", [
	{
		key: 'work',
		label: 'Work'
	},
	{
		key: 'personal',
		label: 'Personal'
	},
	{
		key: 'other',
		label: 'Other'
	}
])

//used for phone types dropdown
.value("phoneTypes", [
	{
		key: 'work',
		label: 'Work'
	},
	{
		key: 'personal',
		label: 'Personal'
	},
	{
		key: 'other',
		label: 'Other'
	}
])

//Includes / Exclues for Grid Query
//Increases Performance by not including unnecessary json aka-sales process

//Tells sidebar what extra info to include in query when fetching individual record

.value("EXCLUDE-Opportunity", {
        "process": false
 })

 .value("INCLUDE-Opportunity", ['']);
