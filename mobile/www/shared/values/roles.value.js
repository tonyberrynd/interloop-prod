angular.module('interloop.value.roles', [])

//aggregation of permissions by role
//---------------------------------------

.value("Roles", [
	{"name":"SUPERADMIN",
	 "permissions": ['ASSIGN_TASKS', 'BULK_DELETE', 'BULK_MERGE', 'EXPORT_GRID', 'GROUP_BY', 'OWNER_FILTER', 'SAVE_TEAM_VIEWS', 'SHOW_CHANGES_TAB', 'SHOW_DELETED', 'VIEW_DASHBOARDS', 'VIEW_BILLING', 'VIEW_SETTINGS', 'LOAD_FULLCONTACT', 'TODAY_ADMIN']
	},
	{"name":"PRIMARY",
	 "permissions": ['ASSIGN_TASKS', 'BULK_DELETE', 'BULK_MERGE', 'EXPORT_GRID', 'GROUP_BY', 'OWNER_FILTER', 'SAVE_TEAM_VIEWS', 'SHOW_CHANGES_TAB', 'SHOW_DELETED', 'VIEW_DASHBOARDS', 'TODAY_ADMIN']
	},
	{"name":"ADMIN",
	 "permissions": ['ASSIGN_TASKS', 'BULK_DELETE', 'BULK_MERGE', 'EXPORT_GRID', 'GROUP_BY', 'OWNER_FILTER', 'SAVE_TEAM_VIEWS', 'SHOW_CHANGES_TAB', 'SHOW_DELETED', 'VIEW_DASHBOARDS', 'TODAY_ADMIN']
	},
	{"name":"EXEC",
	 "permissions": ['ASSIGN_TASKS', 'BULK_DELETE', 'BULK_MERGE', 'EXPORT_GRID', 'GROUP_BY', 'OWNER_FILTER', 'SAVE_TEAM_VIEWS', 'SHOW_CHANGES_TAB', 'SHOW_DELETED', 'VIEW_DASHBOARDS']
	},
	{"name":"MANAGER",
	 "permissions": ['ASSIGN_TASKS', 'BULK_DELETE', 'BULK_MERGE', 'EXPORT_GRID', 'GROUP_BY', 'OWNER_FILTER', 'SAVE_TEAM_VIEWS', 'SHOW_CHANGES_TAB', 'SHOW_DELETED',
	 'VIEW_DASHBOARDS']
	},
	{"name":"REP",
	 "permissions": []
	},
	{"name":"LIGHT",
	 "permissions": []
	}
]);