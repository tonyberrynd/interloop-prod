angular.module('interloop.value.fields', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//Activity Fields
.constant("ProspectFields", [

	{
		"label": "Name",
		"key": "name",
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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		//filters
		"filterApplied": false,
		"filterValue": null
	},
])

//Activity Fields
.constant("LeadFields", [

	//first name - string
	{
		"label": "Name",
		"key": "name",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true
	}
])


//Activity Fields
.constant("ContentFields", [

	//first name - string
	{
		"label": "Name",
		"key": "name",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true
	}
])

//Activity Fields
.constant("GoalFields", [

	//first name - string
	{
		"label": "Name",
		"key": "name",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true
	}
])


//Activity Fields
.constant("ForecastFields", [

	//first name - string
	{
		"label": "Name",
		"key": "name",
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
	{
		"label": "Quota",
		"key": "quota",
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
	{
		"label": "Closed",
		"key": "closed",
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
		{
		"label": "Forecast",
		"key": "forecast",
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
		{
		"label": "Pipeline",
		"key": "pipeline",
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
		{
		"label": "Omitted",
		"key": "omitted",
		"type": "string",
		"locked": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true
	}
])

//Activity Fields
.constant("ActivityFields", [

	//first name - string
	{
		"label": "Name",
		"key": "name",
		"type": "string",
		"locked": true,
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		"required": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'activityNameRender',
		"pinned": true
	},
	{
		"label": "Description",
		"key": "description",
		"type": "textarea",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		//grid
		"excludeGrid": true,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false
	},

	{
		"label": "Type",
		"key": "type",
		"type": "category",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": 'getNestedValue',
		"cellRenderer": null,
		"pinned": false
	},

	{
		"label": "Due Date",
		"key": "dueDate",
		"type": "date",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		"required": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'dueDateRender',
		"pinned": false,

		"allowGroup": true
	},

	{
		"label": "Owner",
		"key": "owner",
		"type": "category",
		"typeKey": "fullName",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false
	}

])


.constant("OpportunityFields", [
 //    {
	// 	"label": "Forecast?",
	// 	"key": "inForecast",
	// 	"type": "custom",
	// 	"locked": true,
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 84,
	// 	"valueGetter": null,
	// 	"cellRenderer": 'inForecastRender',
	// 	"pinned": true,
	// 	//forms
	// 	"class": "col-xs-12",
	// 	"excludeForm": true,
	// 	//should it be on new form
	// 	"excludeNew": true,
	// 	"newClass": "col-xs-12",
	// 	//filters
	// 	"filterApplied": false,
	// 	"filterValue": null
	// },
	{
		"label": "Name",
		"key": "name",
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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newRequired": true,
		"newClass": "col-xs-12",
		//filters
		"filterApplied": false,
		"filterValue": null,
		"exportConfig":  {
          "label": "Name", // (optional, column will be labeled 'path.to.something' if not defined)
          "value": "name", // data.path.to.something
          "default": '' // default if value is not found (optional, overrides `defaultValue` for column)
        }
	},
	{
	   	"label": "Score",
	    "key": "smartScore",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": 'smartScoreRender',
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"newRequired": true,
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null,
		"exportConfig":  {
          "label": "Smart Score", // (optional, column will be labeled 'path.to.something' if not defined)
          "value": "smartScore", // data.path.to.something
          "default": '' // default if value is not found (optional, overrides `defaultValue` for column)
        }
	},

	// 	{
	// 	"label": "Popover",
	// 	"key": "popover",
	// 	"type": "string",
	// 	"locked": true,
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 300,
	// 	"valueGetter": null,
	// 	"cellRenderer": 'popoverRender',
	// 	"pinned": false,
	// 	//forms
	// 	"class": "col-xs-12",
	// 	"excludeForm": false,
	// 	//should it be on new form
	// 	"excludeNew": false,
	// 	"newClass": "col-xs-12",
	// 	//filters
	// 	"filterApplied": false,
	// 	"filterValue": null
	// },
	// {
	//    	"label": "Overdue Activities",
	//     "key": "overdueActivities",
	//     "type": "number",
	//     "locked": true,
	//     //grid
	//     "excludeGrid": false,
 //    	"hide": false,
 //    	"width": 100,
	// 	"valueGetter": 'getOverdueActivities',
	// 	"cellRenderer": null,
	// 	"pinned": null,
	// 	//forms
	// 	"class": "col-xs-6",
	// 	"excludeForm": true,
	// 	//should it be on new form
	// 	"newClass": "col-xs-6",
	// 	"excludeNew": true,
	// 	//filters
	// 	"filterApplied": false,
	// 	"filterValue": null
	// },
	{
	   	"label": "Primary Company",
	    "key": "primaryCompany",
	    "type": "lookup",
	    "lookupEntity": "Company",
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
		"excludeForm": false,
		"newClass": "col-xs-12",
		//should it be on new form
		"excludeNew": false,
		"newRequired": true,
		//filters
		"filterApplied": false,
		"filterValue": null,
		"exportConfig": {
	      "label": "Primary Company", // (optional, column will be labeled 'path.to.something' if not defined)
	      "value": function(row, field, data) {
	      	if(row.entityLinks && row.entityLinks.length){
	          return _.find(row.entityLinks, {"entityType": entityType, "isPrimary": true}); 
	      	}
	      },
	      "default": '' // default if value is not found (optional, overrides `defaultValue` for column)
	    },
	},
	{
		"label": "Status",
		"colId":"status",
		"key": "status",
		"type": "category",
		"locked": true,

		"exportKey": "status.label",
		//loopup fields
	    "queryKey": "oppStatus",
	   	//grouping
	    "groupByKey": "status.key",
	    "groupByLabel": "status.label",

	    "values": [
	    	{
	    		"index": "0",
	    	 	"color": "#199ED9",
	    	 	"label": "Open",
	    	 	"value": "open"
	    	 },
	    	 {
	    	 	"index": "1",
	    	  	"color": "#F2AF01",
	    	 	"label": "Parked",
	    	 	"value": "parked"
	    	  },
	    	 {
	    	 	"index": "2",
	    	 	"color": "#18C489",
	    	 	"label": "Closed - Won",
	    	 	"value": "closedWon"
	    	 },
	    	 {
	    	 	"index": "3",
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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newRequired": true,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},
	{
	   	"label": "Pipeline",
	    "key": "pipeline",
	    "colId": "pipeline",
	    "type": "category",
	    "locked": true,
	    //loopup fields
	    "queryKey": "oppPipeline",
	    //grouping
	    "groupByKey": "pipeline.key",
	    "groupByLabel": "pipeline.label",
	    "values": [{
	    	"index": "0",
	    	"label": "Pipeline 1",
	    	"value": "pipeline1"
	    },
	    {
	    	"index": "1",
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
		"excludeForm": true,
		//should it be on new form
		"excludeNew": false,
		"newRequired": true,
		"newClass": "col-xs-12",
		//filters
		"filterApplied": 'includes',
		"filterValue": null,
		//bulk
		"excludeBulk": true
	},
	{
	   	"label": "Owners",
	    "key": "owners",
	    "colId": "owners",
	    "type": "lookup",
	    "lookupEntity": "Appuser",
	    "locked": true,
	    //custom query logic fields
	    "useSortKey": true,
	    "sortKeyASC": "{'ownerLinks':-1}",
	    "sortKeyDESC": "{'ownerLinks':1}",
	   	//grouping
	   	"unwindBy": "ownerLinks",
	    "groupByKey": "ownerLinks.ownerId",
	    "groupByLabel": "ownerLinks.firstName",

	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": "getNestedOwner",
		"cellRenderer": null,
		"pinned": null,
		// forms
		"class": "col-xs-12",
		"excludeForm": true,
		//should it be on new form
		"excludeNew": false,
		"newRequired": false,
		"newClass": "col-xs-12",
		//filters
		"filterApplied": 'includes',
		"filterValue": null,
		//bulk
		"excludeBulk": true
	},
	{
		"label": "Value",
		"key": "value",
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
		"excludeForm": false,
		"newClass": "col-xs-12",
		//should it be on new form
		"excludeNew": false,
		"newRequired": false,
		"newClass": "col-xs-12",
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
		"label": "Estimated Close",
		"key": "estimatedClose",
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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newRequired": false,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
		"label": "Actual Close",
		"key": "actualClose",
		"type": "date",
		"locked": true,
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": "dateWithQuarterRender",
		"pinned": null,
		// forms
		"class": "col-xs-6",
		"excludeForm": false,
		//should it be on new form
		"excludeNew": true,
		"newRequired": false,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
		"label": "Forecast",
		"key": "forecast",
		"colId": "forecast",
		"type": "category",
		"locked": true,
		//loopup fields
	    "queryKey": "oppForecast",
	   	//grouping
	    "groupByKey": "forecast.key",
	    "groupByLabel": "forecast.label",
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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},
	{
		"label": "Stage",
		"colId":"stage",
		"key": "stage",
		"sortKey": "stage.score",
		"type": "category",
		"locked": true,
		//loopup fields
	    "queryKey": "oppStage",
	   	//grouping
	    "groupByKey": "stage.key",
	    "groupByLabel": "stage.label",

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
		"excludeForm": false,
		//should it be on new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": 'includes',
		"filterValue": null
	},
		{
	   	"label": "Days In Pipeline",
	    "key": "daysInPipeline",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
	   	"label": "Days In Stage",
	    "key": "daysInStage",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	{
	   	"label": "Open Tasks",
	    "key": "openTasks",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	{
	   	"label": "Overdue Tasks",
	    "key": "overdueTasks",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null
	},

	{
	   	"label": "Next Activity",
	    "key": "nextActivity",
	    "type": "string",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true,
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
		"label": "Deleted",
		"key": "_isDeleted",
		"type": "boolean",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 100,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		"excludeForm": true,
		//should it be on new form
		"newClass": "col-xs-6",
		"excludeNew": true
	},

	// {
	// 	"label": "Related To",
	// 	"key": "entityLinks",
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
	// 	"excludeForm": true
	// },
	// {
	// 	"label": "Activities",
	// 	"key": "activityLinks",
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
	// 	"excludeForm": true
	// },

])


//Contact Fields
.constant("ContactFields", [

	{
		"label": "Name",
		"key": "name",
		"type": "string",
		"locked": true,
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		//forms
		"class": "col-xs-12",
		"excludeForm": true,
		//should it be on new form
		"excludeNew": true,
		"newRequired": false,
		"newClass": "col-xs-12",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 250,
		"valueGetter": null,
		"cellRenderer": "contactNameRender",
		"pinned": 'left'
	},

	{
	   	"label": "First Name",
	    "key": "firstName",
	    "type": "string",
	    "locked": true,
	    //forms
		"class": "col-xs-6",
		"excludeForm": false,
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid specifics
	    "excludeGrid": true,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	{
	   	"label": "Last Name",
	    "key": "lastName",
	    "type": "string",
	    "locked": true,
	    //forms
		"class": "col-xs-6",
		"excludeForm": false,
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid specifics
	    "excludeGrid": true,
		"hide": false,
		"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	{
	   	"label": "Primary Company",
	    "key": "primaryCompany",
	    "type": "lookup",
	    "lookupEntity": "Company",
	    "locked": true,
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
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

	{
	   	"label": "Title",
	    "key": "title",
	    "type": "string",
	    "locked": true,
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	{
	   	"label": "Email Addresses",
	    "key": "emailAddresses",
	    "type": "array",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": 'emailRender',
		"pinned": null
	},

	{
	   	"label": "Phone Numbers",
	    "key": "phoneNumbers",
	    "type": "array",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},


	{
	   	"label": "Social Accounts",
	    "key": "socialAccounts",
	    "type": "array",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	}
])


.constant("CompanyFields", [

	//first name - string
	{
	   	"label": "Name",
	    "key": "name",
	    "type": "string",
	    "locked": true,
	    //new form
	    "excludeNew": false,
		"newClass": "col-xs-12",
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 300,
		"valueGetter": null,
		"cellRenderer": 'companyNameRender',
		"pinned": 'left'
	},

	// {
	//    	"label": "Engagement",
	//     "key": "engagement",
	//     "type": "string",
	//     "locked": true,
	//     //new form
	//     "excludeNew": false,
	// 	"newClass": "col-xs-12",
	//    	//grid
	//     "excludeGrid": false,
 //    	"hide": false,
 //    	"width": 200,
	// 	"valueGetter": null,
	// 	"cellRenderer": null,
	// 	"pinned": null
	// },

	{
	   	"label": "Website",
	    "key": "website",
	    "type": "string",
	    "locked": true,
	    //new form
	    "excludeNew": false,
		"newClass": "col-xs-12",
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": 'websiteRender',
		"pinned": null
	}
])


.constant("EndFields", [

	{
		"label": "Tags",
		"key": "tags",
		"type": "lookup",
		"lookupEntity": "Tag",
		//sorting
		"useSortKey": true,
	    "sortKeyASC": "{'tagCount': 'ASC'}",
	    "sortKeyDESC": "{'tagCount': 'DESC'}",
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

	{
		"label": "Last Interaction",
		"key": "lastInteraction",
		"type": "date",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getLastInteraction',
		"cellRenderer": 'dateRender',
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk
		"excludeBulk": true
	},

	{
		"label": "Last Interaction By",
		"key": "interactionBy",
		"type": "string",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk
		"excludeBulk": true
	},

	{
		"label": "Last Updated",
		"key": "updatedOn",
		"type": "date",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk
		"excludeBulk": true
	},

	{
		"label": "Updated By",
		"key": "updatedBy",
		"type": "string",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk
		"excludeBulk": true
	},

	{
		"label": "Created On",
		"key": "createdOn",
		"type": "date",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": null,
		"cellRenderer": 'dateRender',
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk
		"excludeBulk": true
	},

	{
		"label": "Created By",
		"key": "createdBy",
	    "type": "lookup",
	    "lookupEntity": "Appuser",
		"disabled": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 150,
		"valueGetter": 'getNestedOwner',
		"cellRenderer": null,
		"pinned": false,
		//forms
		"class": "col-xs-6",
		//bulk edit
		"excludeBulk": true
	}

])


