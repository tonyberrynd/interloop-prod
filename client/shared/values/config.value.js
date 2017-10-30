angular.module('interloop.value.config', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//used to configure which entities are available
.value("entityTypes", {
	'forecast': {
		singular: 'Forecast',
		plural: 'Forecasts',
		allowStars: false
	},
	'opportunity': {
		singular: 'Opportunity',
		plural: 'Opportunities',
		allowStars: true
	},
	'contact': {
		singular: 'Contact',
		plural: 'Contacts',
		allowStars: true
	},
	'company': {
		singular: 'Company',
		plural: 'Companies',
		allowStars: true
	},
	'activity': {
		singular: 'Activity',
		plural: 'Activities',
		allowStars: false
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

//Excludes for for Grid Query - helps with performance

.value("EXCLUDE-Opportunity", {
        "process": false,
        "activityLinks": false,
        "itemLinks": false 
 })


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
