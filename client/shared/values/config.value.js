angular.module('interloop.value.config', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//used to configure which entities are available
.value("entityTypes", {
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
	'activity': {
		singular: 'Activity',
		plural: 'Activities'
	},
	'attachment': {
		singular: 'Attachment',
		plural: 'Attachments'
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
	}
	// 'activity': {
	// 	singular: 'Activity',
	// 	plural: 'Activities'
	// },
	// 'attachment': {
	// 	singular: 'Attachment',
	// 	plural: 'Attachments'
	// }
})

//
// .value("companyTypes", [
// 	{
// 		key: 'linkedIn',
// 		label: 'LinkedIn',
// 		icon: 'fa fa-linkedin-square'
// 	},
// 	{
// 	    key: 'twitter',
// 		label: 'Twitter',
// 		icon: 'fa fa-twitter-square'
// 	},
// 	{
// 		key: 'facebook',
// 		label: 'Facebook',
// 		icon: 'fa fa-facebook-square'
// 	}
// ])

//used for social types dropdown
// .value("contacTypes", [
// 	{
// 		key: 'linkedIn',
// 		label: 'LinkedIn',
// 		icon: 'fa fa-linkedin-square'
// 	},
// 	{
// 	    key: 'twitter',
// 		label: 'Twitter',
// 		icon: 'fa fa-twitter-square'
// 	},
// 	{
// 		key: 'facebook',
// 		label: 'Facebook',
// 		icon: 'fa fa-facebook-square'
// 	}
// ])

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

.value("chartTypes", [
  {
    'label': 'Area', 
    'value': 'area',
    'icon': 'wb-pie'
  },
    {
    'label': 'Bar', 
    'value': 'bar',
    'icon': 'wb-pie'
  },
   {
    'label': 'Stacked Bar', 
    'value': 'bar',
    'icon': 'wb-pie'
    },
    {
    'label': 'Line', 
    'value': 'line',
    'icon': 'wb-pie'
    },
    {
    'label': 'Doughnut', 
    'value': 'pie',
    'icon': 'wb-pie'
  }])
