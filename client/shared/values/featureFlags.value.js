angular.module('interloop.value.featureFlags', [])

// FOR NOW - THIS IS A LIST OFF ALL THE FEATURE FLAGS
//---------------------------------------------------

//TYPES OF FEATURE FLAGS
//BETA - UNRELEASED FEATURES

.constant("FeatureFlags", [
	{"key": "--DEV-INSPECTOR--",
	 "name": "Inspect Scope",
	 "active": false,
	 "description": "Shows current scope while navigating around",
	 "group": "Dev"
	},
	{"key": "--INSIGHTS_DIVIDER--",
	 "name": "Insights Divider",
	 "active": false,
	 "description": "Divider",
	 "group": "Nav Dividers"
	},
	{"key": "--PULSE--",
	 "name": "Pulse",
	 "active": false,
	 "description": "Module - Pulse",
	 "group": "Modules"
	},
	{"key": "--DASHBOARD--",
	 "name": "Dashboard",
	 "active": false,
	 "description": "Module - DASHBOARD",
	 "group": "Modules"
	},
	{"key": "--REPORTS--",
	 "name": "Reports",
	 "active": false,
	 "description": "Module - REPORTS",
	 "group": "Modules"
	},
	{"key": "--EXPLORER--",
	 "name": "Explorer",
	 "active": false,
	 "description": "Module - EXPLORER",
	 "group": "Modules"
	},
	{"key": "--ANALYTICS--",
	 "name": "Analytics",
	 "active": false,
	 "description": "Module - ANALYTICS",
	 "group": "Modules"
	},
	{"key": "--FORECAST_DIVIDER--",
	 "name": "Forecast Divider",
	 "active": false,
	 "description": "Divider",
	 "group": "Nav Dividers"
	},
	{"key": "--MY-FORECAST--",
	 "name": "My Forecast",
	 "active": false,
	 "description": "Module - MY FORECAST",
	 "group": "Modules"
	},
	{"key": "--BOOKINGS--",
	 "name": "Bookings",
	 "active": false,
	 "description": "Module - BOOKINGS",
	 "group": "Modules"
	},
	{"key": "--FORECAST--",
	 "name": "Forecast",
	 "active": false,
	 "description": "Module - FORECAST",
	 "group": "Modules"
	},
	{"key": "--REVENUE--",
	 "name": "Revenue",
	 "active": false,
	 "description": "Module - REVENUE",
	 "group": "Modules"
	},
	{"key": "--PIPELINE-DIVIDER--",
	 "name": "Pipeline Divider",
	 "active": false,
	 "description": "Divider",
	 "group": "Nav Dividers"
	},
	{"key": "--PURSUITS--",
	 "name": "Pursuits",
	 "active": false,
	 "description": "Module - PURSUITS",
	 "group": "Modules"
	},
	{"key": "--OPPORTUNITIES--",
	 "name": "Opportunities",
	 "active": false,
	 "description": "Module - OPPORTUNITIES",
	 "group": "Modules"
	},
	{"key": "--FLOW--",
	 "name": "Flow",
	 "active": false,
	 "description": "Module - FLOW",
	 "group": "Modules"
	},
	{"key": "--COACHING-DIVIDER--",
	 "name": "Coaching Divider",
	 "active": false,
	 "description": "Divider",
	 "group": "Nav Dividers"
	},
	{"key": "--PERFORMANCE--",
	 "name": "Performance",
	 "active": false,
	 "description": "Module - PERFORMANCE",
	 "group": "Modules"
	},
	{"key": "--RISK--",
	 "name": "Risk",
	 "active": false,
	 "description": "Module - RISK",
	 "group": "Modules"
	},
	{"key": "--CRM-DIVIDER--",
	 "name": "CRM Divider",
	 "active": false,
	 "description": "Divider",
	 "group": "Nav Dividers"
	},
	{"key": "--ACTIVITIES--",
	 "name": "Activities",
	 "active": false,
	 "description": "Module - ACTIVITIES",
	 "group": "Modules"
	},
	{"key": "--CONTACTS--",
	 "name": "Contacts",
	 "active": false,
	 "description": "Module - CONTACTS",
	 "group": "Modules"
	},
	{"key": "--COMPANIES--",
	 "name": "Companies",
	 "active": false,
	 "description": "Module - COMPANIES",
	 "group": "Modules"
	},
	{"key": "--PROJECTS--",
	 "name": "Projects",
	 "active": false,
	 "description": "Module - PROJECTS",
	 "group": "Modules"
	},
	{"key": "--CONTENT--",
	 "name": "Content",
	 "active": false,
	 "description": "Module - CONTENT",
	 "group": "Modules"
	},
	{"key": "--MORE-MENTIONS--",
	 "name": "Mentions",
	 "active": false,
	 "description": "More Dropdown - Mentions",
	 "group": "More Dropdown"
	},
	{"key": "--CRM-SYNC--",
	 "name": "CRM Sync",
	 "active": false,
	 "description": "Quick Access to CRM Sync",
	 "group": "Integrations"
	},
	{"key": "--EXPORT-VIEW--",
	 "name": "Export View",
	 "active": false,
	 "description": "Export Data Behind a View",
	 "group": "Data"
	},
	{"key": "--IMPORT-DATA--",
	 "name": "Import Data",
	 "active": false,
	 "description": "Import data of a particular type",
	 "group": "Data"
	},
	{"key": "--PREDICTED-VALUE--",
	 "name": "Predicted Value",
	 "active": false,
	 "description": "Shows predicted value of a given Opp in the grid",
	 "group": "Data"
	},
	{"key": "--RELATIVE-DATE--",
	 "name": "Relative Date Filter",
	 "active": false,
	 "description": "Shows value within days ago or ahead",
	 "group": "Data"
	},
	{"key": "--FILTER-TOOLBAR--",
	 "name": "Sidebar Filter Toolbar",
	 "active": false,
	 "description": "Allows grouping of filters by functional area",
	 "group": "Data"
	},
	{"key": "--RECENT-SEARCHES--",
	 "name": "Show Recent Searches",
	 "active": false,
	 "description": "Shows A Users Recent Searches",
	 "group": "Search"
	},
	{"key": "--OVERLAY-SPLIT--",
	 "name": "Overlay Split - lets you add overlay credit to users",
	 "active": false,
	 "description": "Let's a user recieve overlay credit on an opp",
	 "group": "Data"
	},
	{"key": "--OPPORTUNITY-HEALTH--",
	 "name": "Shows Opportunity Smartscore over time",
	 "active": false,
	 "description": "Shows opp health over time",
	 "group": "Sidebar"
	},
	{"key": "--VIEW-ALL-NOTIFICATIONS--",
	 "name": "Lets User Look at all notifications",
	 "active": false,
	 "description": "Look at all notifications",
	 "group": "Data"
	},
	{"key": "--NOTIFICATION-ACTIONS--",
	 "name": "Trigger Actions Directly From Notifications",
	 "active": false,
	 "description": "Trigger Actions Directly From Notifications",
	 "group": "Data"
	}
	
]);

