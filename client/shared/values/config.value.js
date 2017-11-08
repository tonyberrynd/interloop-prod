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
   "label": "About.me",
   "key": "aboutme",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "AngelList",
   "key": "angellist",
   "icon": "fa fa-angellist",
   "mask": "" 
 },
 {
   "label": "Bandcamp",
   "key": "bandcamp",
   "icon": "fa fa-bandcamp",
   "mask": "" 
 },
 {
   "label": "Bebo",
   "key": "bebo",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "Behance",
   "key": "behance",
   "icon": "fa-behance",
   "mask": "" 
 },
 {
   "label": "BitBucket",
   "key": "bitbucket",
   "icon": "fa-bitbucket",
   "mask": "" 
 },
 {
   "label": "Crunchbase",
   "key": "crunchbase",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "DandyId",
   "key": "dandyid",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "Delicious",
   "key": "delicious",
   "icon": "fa fa-delicious",
   "mask": "" 
 },
 {
   "label": "Digg",
   "key": "digg",
   "icon": "fa-digg",
   "mask": "" 
 },
 {
   "label": "Dribbble",
   "key": "dribble",
   "icon": "fa fa-dribble",
   "mask": "" 
 },
 {
   "label": "Facebook",
   "key": "facebook",
   "icon": "fa fa-facebook",
   "mask": "" 
 },
 {
   "label": "Flickr",
   "key": "flickr",
   "icon": "fa fa-flickr",
   "mask": "" 
 },
 {
   "label": "FourSquare",
   "key": "foursquare",
   "icon": "fa fa-foursquare",
   "mask": "" 
 },
 {
   "label": "FriendFeed",
   "key": "friendfeed",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "GitHub",
   "key": "github",
   "icon": "fa fa-github",
   "mask": "" 
 },
 {
   "label": "GoogleProfile",
   "key": "googleprofile",
   "icon": "",
   "mask": "" 
 },
{
   "label": "GooglePlus",
   "key": "'google",
   "icon": "fa fa-google-plus",
   "mask": "" 
 },
 {
   "label": "GooglePlus",
   "key": "'googleplus",
   "icon": "fa fa-google-plus",
   "mask": "" 
 },
 {
   "label": "HackerNews",
   "key": "hackernews",
   "icon": "fa fa-hacker-news",
   "mask": "" 
 },
 {
   "label": "HypeMachine",
   "key": "hypemachine",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "IMDB",
   "key": "imdb",
   "icon": "fa fa-imdb",
   "mask": "" 
 },
 {
   "label": "Klout",
   "key": "klout",
   "icon": "",
   "mask": "" 
 },
 {
   "label": "LinkedIn",
   "key": "linkedin",
   "icon": "fa fa-linkedin",
   "mask": "" 
 },
 {
   "label": "Meetup",
   "key": "meetup",
   "icon": "fa fa-meetup",
   "mask": "" 
 },
 {
   "label": "Mixcloud",
   "key": "mixcloud",
   "icon": "fa fa-mixcloud",
   "mask": "" 
 },
 {
   "label": "Pinterest",
   "key": "pinterest",
   "icon": "fa fa-pinterest",
   "mask": "" 
 },
 {
   "label": "Quora",
   "key": "quora",
   "icon": "fa fa-quora",
   "mask": "" 
 },
 {
   "label": "Reddit",
   "key": "reddit",
   "icon": "fa fa-reddit",
   "mask": "" 
 },
 {
   "label": "SlideShare",
   "key": "slideshare",
   "icon": "fa fa-slideshare",
   "mask": "" 
 },
 {
   "label": "SoundCloud",
   "key": "soundcloud",
   "icon": "fa fa-soundcloud",
   "mask": "" 
 },
 {
   "label": "StackExchange",
   "key": "stackexchange",
   "icon": "fa fa-stack-exchange",
   "mask": "" 
 },
 {
   "label": "StackOverflow",
   "key": "stackoverflow",
   "icon": "fa fa-stack-overflow",
   "mask": "" 
 },
 {
   "label": "Steam",
   "key": "steam",
   "icon": "fa fa-steam",
   "mask": "" 
 },
 {
   "label": "Tumblr",
   "key": "tumblr",
   "icon": "fa fa-tumblr",
   "mask": "" 
 },
 {
   "label": "Twitter",
   "key": "twitter",
   "icon": "fa fa-twitter",
   "mask": "" 
 },
 {
   "label": "Vimeo",
   "key": "vimeo",
   "icon": "fa fa-vimeo",
   "mask": "" 
 },
 {
   "label": "WordPress.com",
   "key": "wordpress",
   "icon": "fa fa-wordpress",
   "mask": "" 
 },
 {
   "label": "Xing",
   "key": "xing",
   "icon": "fa fa-xing",
   "mask": "" 
 },
 {
   "label": "Yelp",
   "key": "yelp",
   "icon": "fa fa-yelp",
   "mask": "" 
 }
]);
