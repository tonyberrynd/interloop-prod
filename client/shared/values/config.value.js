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
		key: 'mobile',
		label: 'Mobile'
	},
	{
		key: 'home',
		label: 'Home'
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


.value("socialTypes", [
 {
   "label": "AngelList",
   "key": "angellist",
   "icon": "fa fa-angellist",
   "mask": "https://angel.co/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Behance",
   "key": "behance",
   "icon": "fa-behance",
   "mask": "https://www.behance.net/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "BitBucket",
   "key": "bitbucket",
   "icon": "fa-bitbucket",
   "mask": "https://bitbucket.org/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "Crunchbase",
   "key": "crunchbase",
   "icon": "",
   "mask": "https://www.crunchbase.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Dribbble",
   "key": "dribble",
   "icon": "fa fa-dribble",
   "mask": "https://dribbble.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"  
 },
 {
   "label": "Facebook",
   "key": "facebook",
   "icon": "fa fa-facebook",
   "mask": "https://www.facebook.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Flickr",
   "key": "flickr",
   "icon": "fa fa-flickr",
   "mask": "https://www.flickr.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "FourSquare",
   "key": "foursquare",
   "icon": "fa fa-foursquare",
   "mask": "https://foursquare.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "GitHub",
   "key": "github",
   "icon": "fa fa-github",
   "mask": "https://github.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
{
   "label": "GooglePlus",
   "key": "'google",
   "icon": "fa fa-google-plus",
   "mask": "http://profiles.google.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "GooglePlus",
   "key": "'googleplus",
   "icon": "fa fa-google-plus",
   "mask": "http://profiles.google.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Klout",
   "key": "klout",
   "icon": "",
   "mask": "https://klout.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "LinkedIn",
   "key": "linkedin",
   "icon": "fa fa-linkedin",
   "mask": "https://www.linkedin.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Meetup",
   "key": "meetup",
   "icon": "fa fa-meetup",
   "mask": "https://www.meetup.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "Pinterest",
   "key": "pinterest",
   "icon": "fa fa-pinterest",
   "mask": "http://www.pinterest.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Quora",
   "key": "quora",
   "icon": "fa fa-quora",
   "mask": "https://www.quora.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "Reddit",
   "key": "reddit",
   "icon": "fa fa-reddit",
   "mask": "https://www.reddit.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "SlideShare",
   "key": "slideshare",
   "icon": "fa fa-slideshare",
   "mask": "https://www.slideshare.net*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "SoundCloud",
   "key": "soundcloud",
   "icon": "fa fa-soundcloud",
   "mask": "https://soundlcoud.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "StackExchange",
   "key": "stackexchange",
   "icon": "fa fa-stack-exchange",
   "mask": "https://stackexchange.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "StackOverflow",
   "key": "stackoverflow",
   "icon": "fa fa-stack-overflow",
   "mask": "https://stackoverflow.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "Tumblr",
   "key": "tumblr",
   "icon": "fa fa-tumblr",
   "mask": "http://*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?.tumblr.com" 
 },
 {
   "label": "Twitter",
   "key": "twitter",
   "icon": "fa fa-twitter",
   "mask": "https://twitter.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?"
 },
 {
   "label": "Vimeo",
   "key": "vimeo",
   "icon": "fa fa-vimeo",
   "mask": "https://vimeo.com/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?" 
 },
 {
   "label": "Yelp",
   "key": "yelp",
   "icon": "fa fa-yelp",
   "mask": "http://*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?.yelp.com"
 },
  {
   "label": "Other",
   "key": "other",
   "icon": "fa fa-link",
   "mask": ""
 }
]);
