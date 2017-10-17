angular.module('interloop.value.fields', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------


//Activity Fields
.constant("ActivityFields", {

	//first name - string
	"name": {
		"label": "Name",
		"field": "name",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true
	},
	"description": {
		"label": "Description",
		"field": "description",
		"type": "string",
		//grid
		"excludeGrid": true,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false
	},

	"type": {
		"label": "Type",
		"field": "type",
		"type": "category",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": 'getNestedValue',
		"cellRenderer": null,
		"pinned": false
	},

	"owner": {
		"label": "Owner",
		"field": "owner",
		"type": "string",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false
	},

	"relatedTo": {
		"label": "Related To",
		"field": "relatedTo",
		"type": "array",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false
	},

	"dueDate": {
		"label": "Due Date",
		"field": "dueDate",
		"type": "date",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false
	},

})


.constant("OpportunityFields", {

	"name": {
		"label": "Name",
		"field": "name",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true,
		//forms
		"class": "col-xs-12",
		"exludeForm": false,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	"primaryCompany": {
	   	"label": "Primary Company",
	    "field": "primaryCompany",
	    "type": "lookup",
	    "locked": true,
	    //loopup fields
	    "queryKey": "primaryCompany",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": 'getPrimaryCompany',
		"cellRenderer": 'primaryCompanyRender',
		"pinned": null,
		//forms
		"class": "col-xs-12",
		"exludeForm": false,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	"pipeline": {
	   	"label": "Pipeline",
	    "field": "pipeline",
	    "type": "category",
	    "locked": true,
	    //loopup fields
	    "queryKey": "oppPipeline",
	    "values": [{
	    	"label": "Pipeline 1",
	    	"value": "pipeline1"
	    },
	    {
	    	"label": "Pipeline 2",
	    	"value": "pipeline2"
	    }],
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": "getNestedValue",
		"cellRenderer": null,
		"pinned": null,
		// forms
		"class": "col-xs-12",
		"exludeForm": true,
		//filters
		"filterApplied": 'includes',
		"filterValue": null,
		//bulk
		"excludeBulk": true
	},

	"owners": {
	   	"label": "Owners",
	    "field": "owners",
	    "type": "lookup",
	    "locked": true,
	    //loopup fields
	    "queryKey": "oppOwner",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": "getNestedOwner",
		"cellRenderer": null,
		"pinned": null,
		// forms
		"class": "col-xs-12",
		"exludeForm": false,
		//filters
		"filterApplied": 'includes',
		"filterValue": null,
		//bulk
		"excludeBulk": true
	},

	"value": {
		"label": "Value",
		"field": "value",
		"type": "currency",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellClass": "text-right",
		"headerValueGetter": "getOppValueHeader",
		"cellRenderer": "oppValueRender",
		"pinned": null,
		// forms
		"class": "col-xs-12",
		"exludeForm": false,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	"estimatedClose": {
		"label": "Estimated Close",
		"field": "estimatedClose",
		"type": "date",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": "dateWithQuarterRender",
		"pinned": null,
		// forms
		"class": "col-xs-6",
		"exludeForm": false,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	"actualClose": {
		"label": "Actual Close",
		"field": "actualClose",
		"type": "date",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": "dateWithQuarterRender",
		"pinned": null,
		// forms
		"class": "col-xs-6",
		"exludeForm": false,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	"forecast": {
		"label": "Forecast",
		"field": "forecast",
		"type": "category",
		"locked": true,
		//loopup fields
	    "queryKey": "oppForecast",
	    "values": [
	    	{"label": "Pipeline",
	    	 "value": "pipeline"},
	    	 {"label": "Stars Align",
	    	 "value": "starsAlign"},
	    	 {"label": "Likely",
	    	 "value": "likely"},
	    	 {"label": "Hard Commit",
	    	 "value": "hardCommit"}
	    ],
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": "getNestedValue",
		"cellRenderer": null,
		"pinned": null,
		// forms
		"class": "col-xs-12",
		"exludeForm": false,
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},

	"stage": {
		"label": "Stage",
		"colId":"stage.score",
		"field": "stage",
		"type": "category",
		"locked": true,
		//loopup fields
	    "queryKey": "oppStage",
	    "values": [
	    	{"label": "Stage 1",
	    	 "value": "stage1",
	    	 "percentage": 10},
	    	 {"label": "Stage 2",
	    	 "value": "stage2",
	    	 "percentage": 50},
	    	 {"label": "Stage 3",
	    	 "value": "stage3",
	    	 "percentage": 70},
	    	 {"label": "Stage 4",
	    	 "value": "stage4",
	    	 "percentage": 90}
	    ],
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": "getNestedStage",
		"cellRenderer": "oppStageRender",
		"pinned": null,
		// forms
		"class": "col-xs-6",
		"exludeForm": false,
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},

	"status": {
		"label": "Status",
		"colId":"status.order",
		"field": "status",
		"type": "category",
		"locked": true,
		//loopup fields
	    "queryKey": "oppStatus",
	    "values": [
	    	{
	    	 	"color": "#199ED9",
	    	 	"label": "Open",
	    	 	"value": "open"
	    	 },
	    	 {
	    	  	"color": "#F2AF01",
	    	 	"label": "Parked",
	    	 	"value": "parked"
	    	  },
	    	 {
	    	 	"color": "#18C489",
	    	 	"label": "Closed - Won",
	    	 	"value": "closedWon"
	    	 },
	    	 {
	    	 	"color": "#E85252",
	    	 	"label": "Closed - Lost",
	    	 	"value": "closedLost"
	    	 }
	    ],
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": "getNestedValue",
		"cellRenderer": "oppStatusRender",
		"pinned": null,
		// forms
		"class": "col-xs-6",
		"exludeForm": false,
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},


	// "relatedToCount": {
	// 	"label": "Related To",
	// 	"field": "entityLinks",
	// 	"type": "number",
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 150,
	// 	"valueGetter": 'getRelatedToCount',
	// 	"cellRenderer": null,
	// 	"pinned": false,
	// 	// forms
	// 	"class": "col-xs-6",
	// 	"exludeForm": true
	// },

	// "activityCount": {
	// 	"label": "Activities",
	// 	"field": "activityLinks",
	// 	"type": "number",
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 150,
	// 	"valueGetter": 'getActivityCount',
	// 	"cellRenderer": null,
	// 	"pinned": false,
	// 	// forms
	// 	"class": "col-xs-6",
	// 	"exludeForm": true
	// },

})


//Contact Fields
.constant("ContactFields", {

	"fullName": {
		"label": "Name",
		"field": "fullName",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 250,
		"valueGetter": null,
		"cellRenderer": "contactNameRender",
		"pinned": 'left'
	},

	"firstName": {
	   	"label": "First Name",
	    "field": "firstName",
	    "type": "string",
	    "locked": true,
	    //grid specifics
	    "excludeGrid": true,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	"lastName": {
	   	"label": "Last Name",
	    "field": "lastName",
	    "type": "string",
	    "locked": true,
	    //grid specifics
	    "excludeGrid": true,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	"title": {
	   	"label": "Title",
	    "field": "title",
	    "type": "string",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	"primaryCompany": {
	   	"label": "Primary Company",
	    "field": "primaryCompany",
	    "type": "lookup",
	    "locked": true,
	    //loopup fields
	    "queryKey": "primaryCompany",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": 'getPrimaryCompany',
		"cellRenderer": 'primaryCompanyRender',
		"pinned": null
	},

	"type": {
	   	"label": "Type",
	    "field": "type",
	    "type": "category",
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": 'getNestedValue',
		"cellRenderer": null,
		"pinned": null
	},

	"emailAddresses": {
	   	"label": "Email Addresses",
	    "field": "emailAddresses",
	    "type": "array",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	"phoneNumbers": {
	   	"label": "Phone Numbers",
	    "field": "phoneNumbers",
	    "type": "array",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},


	"socialAccounts": {
	   	"label": "Social Accounts",
	    "field": "socialAccounts",
	    "type": "array",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	}
})


.constant("CompanyFields", {

	//first name - string
	"name": {
	   	"label": "Name",
	    "field": "name",
	    "type": "string",
	    "locked": true,
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 300,
		"valueGetter": null,
		"cellRenderer": 'companyNameRender',
		"pinned": 'left'
	},

	"url": {
	   	"label": "Website",
	    "field": "website",
	    "type": "string",
	    "locked": true,
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": 'websiteRender',
		"pinned": null
	},

	"type": {
	   	"label": "Type",
	    "field": "type",
	    "type": "category",
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": 'getNestedValue',
		"cellRenderer": null,
		"pinned": null
	}
})


.constant("EndFields", {

	"tags": {
		"label": "Tags",
		"field": "tags",
		"type": "lookup",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": null,
		"cellRenderer": 'tagsRender',
		"pinned": false,
		//bulk
		"excludeBulk": true
	},

	"lastInteraction": {
		"label": "Last Interaction",
		"field": "lastInteraction",
		"type": "date",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getLastInteraction',
		"cellRenderer": 'dateRender',
		"pinned": false,
		//bulk
		"excludeBulk": true
	},

	"lastUpdated": {
		"label": "Last Updated",
		"field": "updatedOn",
		"type": "date",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false,
		//bulk
		"excludeBulk": true
	},

	"updatedBy": {
		"label": "Updated By",
		"field": "updatedBy",
		"type": "lookup",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false,
		//bulk
		"excludeBulk": true
	},

	"createdDate": {
		"label": "Create On",
		"field": "createdOn",
		"type": "date",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false,
		//bulk
		"excludeBulk": true
	},

	"createdBy": {
		"label": "Created By",
		"field": "createdBy",
		"type": "lookup",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false,
		//bulk edit
		"excludeBulk": true
	}

})


