angular.module('interloop.value.permissions', [])

// FOR NOW - THIS IS A LIST OFF ALL THE FEATURE FLAGS
//---------------------------------------------------

.value('Permissions', [

	{'name': 'Assign Tasks',
	 'description': 'The ability to assign tasks to others',
	 'key': 'ASSIGN_TASKS',
	 'enabled': true
	},


	{'name': 'Bulk Delete',
	 'description': 'The ability to mass delete (Soft Delete) records',
	 'key': 'BULK_DELETE',
	 'enabled': true
	},


	{'name': 'Bulk Merge',
	 'description': 'The ability to merge multiple records at once',
	 'key': 'BULK_MERGE',
	 'enabled': true
	},


	{'name': 'Export To Excel',
	 'description': 'The ability to export records to excel (can only export records that users have access to)',
	 'key': 'EXPORT_GRID',
	 'enabled': true
	},


	{'name': 'Group By',
	 'description': 'The ability to group records in by various fields',
	 'key': 'GROUP_BY',
	 'enabled': true
	},


	{'name': 'Filter By Owner',
	 'description': 'The ability filter records by owner',
	 'key': 'OWNER_FILTER',
	 'enabled': true
	},


	{'name': 'Save Team Views',
	 'description': 'The ability to create and share views with a team',
	 'key': 'SAVE_TEAM_VIEWS',
	 'enabled': true
	},


	{'name': 'Show Opportunity Changes',
	 'description': 'The ability to overlay any changes on top of the Opportunity list',
	 'key': 'SHOW_CHANGES_TAB',
	 'enabled': true
	},


	{'name': 'Show Soft Deleted Records',
	 'description': 'The ability to include and filter by soft deleted records in lists',
	 'key': 'SHOW_DELETED',
	 'enabled': true
	},


	{'name': 'View Dashboard',
	 'description': 'The ability to view the dasboards module',
	 'key': 'VIEW_DASHBOARDS',
	 'enabled': true
	},


	{'name': 'View Billing',
	 'description': 'The ability to view billing / subscription information (Enabled for App Owner by default)',
	 'key': 'VIEW_BILLING',
	 'enabled': true
	},


	{'name': 'View Settings',
	 'description': 'The ability to view settings and make configuration changes (Enabled for admins by default)',
	 'key': 'VIEW_SETTINGS',
	 'enabled': true
	}

]);