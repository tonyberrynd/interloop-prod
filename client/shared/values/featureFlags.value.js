angular.module('interloop.value.featureFlags', [])

// FOR NOW - THIS IS A LIST OFF ALL THE FEATURE FLAGS
//---------------------------------------------------

//TYPES OF FEATURE FLAGS
//BETA - UNRELEASED FEATURES

.constant("FeatureFlags", [

	// navigation
	{"key": "--FF_MODULE_PULSE--",
	 "name": "Pulse",
	 "active": false,
	 "description": "Pulse",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_DIVIDER_LEARN--",
	 "name": "Learn Divider",
	 "active": false,
	 "description": "Learn Divider",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_DASHBOARDS--",
	 "name": "Dashboards",
	 "active": false,
	 "description": "Dashboards",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_INSIGHTS--",
	 "name": "Insights",
	 "active": false,
	 "description": "Insights",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_EXPLORER--",
	 "name": "Explorer",
	 "active": false,
	 "description": "Explorer",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_POWERBI--",
	 "name": "PowerBI Embedded Analytics",
	 "active": false,
	 "description": "PowerBI Embedded Analytics",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_DIVIDER_COACHING",
	 "name": "Coaching Divider",
	 "description": "Coaching Divider",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_GOALS--",
	 "name": "Goals",
	 "active": false,
	 "description": "Goals",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_PACE--",
	 "name": "Pace",
	 "active": false,
	 "description": "Pace",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_1:1--",
	 "name": "Catch Ups / 1:1's",
	 "active": false,
	 "description": "Catch Ups / 1:1's",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_PERFORMANCE--",
	 "name": "Performance",
	 "active": false,
	 "description": "Performance",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_DIVIDER_FORECAST--",
	 "name": "Forecast Divider",
	 "active": false,
	 "description": "Forecast Divider",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_FORECASTS--",
	 "name": "Forecasts",
	 "active": false,
	 "description": "Forecasts",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_ROLLUP--",
	 "name": "Forecast Rollup",
	 "active": false,
	 "description": "Forecasts",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_PRECISION--",
	 "name": "Forecast Precision",
	 "active": false,
	 "description": "Forecast Precision",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_DIVIDER_MANAGE--",
	 "name": "Manage Divider",
	 "active": false,
	 "description": "Manage Divider",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_OPPORTUNITIES--",
	 "name": "Opportunities",
	 "active": false,
	 "description": "Opportunities",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_CONTACTS--",
	 "name": "Contacts",
	 "active": false,
	 "description": "Contacts",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_COMPANIES--",
	 "name": "Companies",
	 "active": false,
	 "description": "Companies",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_ACTIVITIES--",
	 "name": "Activities",
	 "active": false,
	 "description": "Activities",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_APPOINTMENTS--",
	 "name": "Appointments",
	 "active": false,
	 "description": "Appointments",
	 "group": "Modules",
	 "beta": false
	},
	{"key": "--FF_MODULE_CONTENT--",
	 "name": "Content",
	 "active": false,
	 "description": "Content",
	 "group": "Modules",
	 "beta": false
	}
]);



//OLD FEATURE FLAGS
// .constant("FeatureFlags", [
// 	{"key": "--DEV-INSPECTOR--",
// 	 "name": "Inspect Scope",
// 	 "active": false,
// 	 "description": "Shows current scope while navigating around",
// 	 "group": "Dev"
// 	},
// 	{"key": "--INSIGHTS_DIVIDER--",
// 	 "name": "Insights Divider",
// 	 "active": false,
// 	 "description": "Divider",
// 	 "group": "Nav Dividers"
// 	},
// 	{"key": "--MODULE_DATA--",
// 	 "name": "Data Features",
// 	 "active": false,
// 	 "description": "Module - Data",
// 	 "group": "Modules"
// 	},
// 	{"key": "--MODULE_COACHING--",
// 	 "name": "Coaching Features",
// 	 "active": false,
// 	 "description": "Module - Coaching",
// 	 "group": "Modules"
// 	},
// 	{"key": "--MODULE_ANALYSIS--",
// 	 "name": "Analysis Features",
// 	 "active": false,
// 	 "description": "Module - Analysis",
// 	 "group": "Modules"
// 	},
	
// 	{"key": "--MORE-MENTIONS--",
// 	 "name": "Mentions",
// 	 "active": false,
// 	 "description": "More Dropdown - Mentions",
// 	 "group": "More Dropdown"
// 	},
// 	{"key": "--CRM-SYNC--",
// 	 "name": "CRM Sync",
// 	 "active": false,
// 	 "description": "Quick Access to CRM Sync",
// 	 "group": "Integrations"
// 	},
// 	{"key": "--EXPORT-VIEW--",
// 	 "name": "Export View",
// 	 "active": false,
// 	 "description": "Export Data Behind a View",
// 	 "group": "Data"
// 	},
// 	{"key": "--IMPORT-DATA--",
// 	 "name": "Import Data",
// 	 "active": false,
// 	 "description": "Import data of a particular type",
// 	 "group": "Data"
// 	},
// 	{"key": "--PREDICTED-VALUE--",
// 	 "name": "Predicted Value",
// 	 "active": false,
// 	 "description": "Shows predicted value of a given Opp in the grid",
// 	 "group": "Data"
// 	},
// 	{"key": "--RELATIVE-DATE--",
// 	 "name": "Relative Date Filter",
// 	 "active": false,
// 	 "description": "Shows value within days ago or ahead",
// 	 "group": "Data"
// 	},
// 	{"key": "--FILTER-TOOLBAR--",
// 	 "name": "Sidebar Filter Toolbar",
// 	 "active": false,
// 	 "description": "Allows grouping of filters by functional area",
// 	 "group": "Data"
// 	},
// 	{"key": "--RECENT-SEARCHES--",
// 	 "name": "Show Recent Searches",
// 	 "active": false,
// 	 "description": "Shows A Users Recent Searches",
// 	 "group": "Search"
// 	},
// 	{"key": "--OVERLAY-SPLIT--",
// 	 "name": "Overlay Split - lets you add overlay credit to users",
// 	 "active": false,
// 	 "description": "Let's a user recieve overlay credit on an opp",
// 	 "group": "Data"
// 	},
// 	{"key": "--OPPORTUNITY-HEALTH--",
// 	 "name": "Shows Opportunity Smartscore over time",
// 	 "active": false,
// 	 "description": "Shows opp health over time",
// 	 "group": "Sidebar"
// 	},
// 	{"key": "--VIEW-ALL-NOTIFICATIONS--",
// 	 "name": "Lets User Look at all notifications",
// 	 "active": false,
// 	 "description": "Look at all notifications",
// 	 "group": "Data"
// 	},
// 	{"key": "--NOTIFICATION-ACTIONS--",
// 	 "name": "Trigger Actions Directly From Notifications",
// 	 "active": false,
// 	 "description": "Trigger Actions Directly From Notifications",
// 	 "group": "Data"
// 	}
	
// ]);

