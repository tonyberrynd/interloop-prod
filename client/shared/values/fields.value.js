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
		"columnType": "forecastValue",
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
		"columnType": "forecastValue",
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
		"columnType": "forecastValue",
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
		"columnType": "number",
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
		"label": "Title",
		"key": "title",
		"type": "string",
		"locked": true,
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		"newRequired": true,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
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
		"newClass": "col-xs-6",
		"excludeNew": true,
		"excludeForm": true,
		  "values": [
	    	{"label": "Call",
	    	 "value": "call"},
	    	 {"label": "ToDo",
	    	 "value": "todo"},
	    	 {"label": "Note",
	    	 "value": "note"},
	    	 {"label": "Sit",
	    	 "value": "sit"}
	    ],
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
		"columnType": "date",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		"newRequired": false,
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'dueDateRender',
		"pinned": false,

		"allowGroup": true
	},

<<<<<<< HEAD
=======
<<<<<<< HEAD
	{
		"label": "Completed",
		"key": "completed",
		"type": "boolean",
		"columnType": "boolean",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		"newRequired": false,
		//grid
		"excludeGrid": false,
		"exludeForm": true,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"allowGroup": false
	},


=======
>>>>>>> development
>>>>>>> client-staging
	{
		"label": "Completed Date",
		"key": "completedDate",
		"type": "date",
		"columnType": "date",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-6",
		"newRequired": false,
		//grid
		"excludeGrid": false,
		"exludeForm": true,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'dueDateRender',
		"pinned": false,

		"allowGroup": true
	},

	{
		"label": "Completed",
		"key": "completed",
		"type": "boolean",
		"columnType": "boolean",
		//new form
		"excludeNew": false,
		"newClass": "col-xs-12",
		"newRequired": false,
		//grid
		"excludeGrid": false,
		"exludeForm": true,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"allowGroup": false
	},
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
		//use sort key
		// "useSortKey": true,
	 //    "sortKeyASC": "normalizedName ASC",
	 //    "sortKeyDESC": "normalizedName DESC",
		//grid
		"columnType": "string",
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": true,
		//import
		"excludeImport": false,
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
	   	"columnType": "score",
	    //exlude import
	    "excludeImport": true,
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
	    "columnType": "primaryCompany",
	    "lookupEntity": "Company",
	    "locked": true,
	    //sorting
		"useSortKey": true,
	    "sortKeyASC": "primaryCompanyName ASC",
	    "sortKeyDESC": "primaryCompanyName DESC",
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
		"newRequired": false,
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
	// {
	// 	"label": "Status",
	// 	"colId":"status",
	// 	"key": "status",
	// 	"type": "category",
	// 	"locked": true,

	// 	"exportKey": "status.label",
	// 	//loopup fields
	//     "queryKey": "oppStatus",
	//    	//grouping
	//     "groupByKey": "status.key",
	//     "groupByLabel": "status.label",

	//     "values": [
	//     	{
	//     		"index": "0",
	//     	 	"color": "#199ED9",
	//     	 	"label": "Open",
	//     	 	"value": "open"
	//     	 },
	//     	 {
	//     	 	"index": "1",
	//     	  	"color": "#F2AF01",
	//     	 	"label": "Parked",
	//     	 	"value": "parked"
	//     	  },
	//     	 {
	//     	 	"index": "2",
	//     	 	"color": "#18C489",
	//     	 	"label": "Closed - Won",
	//     	 	"value": "closedWon"
	//     	 },
	//     	 {
	//     	 	"index": "3",
	//     	 	"color": "#E85252",
	//     	 	"label": "Closed - Lost",
	//     	 	"value": "closedLost"
	//     	 }
	//     ],
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 200,
	// 	"valueGetter": "getNestedValue",
	// 	"cellRenderer": "oppStatusRender",
	// 	"pinned": null,
	// 	// forms
	// 	"class": "col-xs-6",
	// 	"excludeForm": false,
	// 	//should it be on new form
	// 	"excludeNew": false,
	// 	"newRequired": true,
	// 	"newClass": "col-xs-6",
	// 	//filters
	// 	"filterApplied": 'includes',
	// 	"filterValue": null
	// },
	// {
	//    	"label": "Pipeline",
	//     "key": "pipeline",
	//     "colId": "pipeline",
	//     "type": "category",
	//     "locked": true,
	//     //loopup fields
	//     "queryKey": "oppPipeline",
	//     //grouping
	//     "groupByKey": "pipeline.key",
	//     "groupByLabel": "pipeline.label",
	//     "values": [{
	//     	"index": "0",
	//     	"label": "Pipeline 1",
	//     	"value": "pipeline1"
	//     },
	//     {
	//     	"index": "1",
	//     	"label": "Pipeline 2",
	//     	"value": "pipeline2"
	//     }],
	//     //grid
	//     "excludeGrid": false,
 //    	"hide": false,
 //    	"width": 200,
	// 	"valueGetter": "getNestedValue",
	// 	"cellRenderer": null,
	// 	"pinned": null,
	// 	// forms
	// 	"class": "col-xs-12",
	// 	"excludeForm": true,
	// 	//should it be on new form
	// 	"excludeNew": false,
	// 	"newRequired": true,
	// 	"newClass": "col-xs-12",
	// 	//filters
	// 	"filterApplied": 'includes',
	// 	"filterValue": null,
	// 	//bulk
	// 	"excludeBulk": true
	// },
	{
	   	"label": "Owners",
	    "key": "owners",
	    "colId": "owners",
	    "type": "lookup",
	    "lookupEntity": "Appuser",
	    "locked": true,

	    "excludeImport": true,
	    //custom query logic fields
	    "useSortKey": true,
	    "sortKeyASC": "ownerLinksCount ASC",
	    "sortKeyDESC": "ownerLinksCount DESC",
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
		"excludeNew": true,
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
		"columnType": "currency",
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
		//should it be on new form
		"excludeNew": false,
		"newRequired": false,
		"newClass": "col-xs-6",
		//filters
		"filterApplied": false,
		"filterValue": null
	},
	{
		"label": "Estimated Close",
		"key": "estimatedClose",
		"columnType": "richDate",
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
		"columnType": "richDate",
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
		"filterValue": null,
		//exlude import
	    "excludeImport": true
	},
	// {
	// 	"label": "Forecast",
	// 	"key": "forecast",
	// 	"colId": "forecast",
	// 	"columnType": "category",
	// 	"type": "category",
	// 	"locked": true,
	// 	//loopup fields
	//     "queryKey": "oppForecast",
	//    	//grouping
	//     "groupByKey": "forecast.key",
	//     "groupByLabel": "forecast.label",
	//     "values": [
	//     	{"label": "Pipeline",
	//     	 "value": "pipeline"},
	//     	 {"label": "Stars Align",
	//     	 "value": "starsAlign"},
	//     	 {"label": "Likely",
	//     	 "value": "likely"},
	//     	 {"label": "Hard Commit",
	//     	 "value": "hardCommit"}
	//     ],
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 200,
	// 	"valueGetter": "getNestedValue",
	// 	"cellRenderer": null,
	// 	"pinned": null,
	// 	// forms
	// 	"class": "col-xs-12",
	// 	"excludeForm": false,
	// 	//should it be on new form
	// 	"excludeNew": false,
	// 	"newClass": "col-xs-12",
	// 	//filters
	// 	"filterApplied": 'includes',
	// 	"filterValue": null
	// },
	// {
	// 	"label": "Stage",
	// 	"colId":"stage",
	// 	"key": "stage",
	// 	"sortKey": "stage.score",
	// 	"type": "category",
	// 	"locked": true,
	// 	//loopup fields
	//     "queryKey": "oppStage",
	//    	//grouping
	//     "groupByKey": "stage.key",
	//     "groupByLabel": "stage.label",

	//     "values": [
	//     	{"label": "Stage 1",
	//     	 "value": "stage1",
	//     	 "percentage": 10},
	//     	 {"label": "Stage 2",
	//     	 "value": "stage2",
	//     	 "percentage": 50},
	//     	 {"label": "Stage 3",
	//     	 "value": "stage3",
	//     	 "percentage": 70},
	//     	 {"label": "Stage 4",
	//     	 "value": "stage4",
	//     	 "percentage": 90}
	//     ],
	// 	//grid
	// 	"excludeGrid": false,
	// 	"hide": false,
	// 	"width": 200,
	// 	"valueGetter": "getNestedStage",
	// 	"cellRenderer": "oppStageRender",
	// 	"pinned": null,
	// 	// forms
	// 	"class": "col-xs-6",
	// 	"excludeForm": false,
	// 	//should it be on new form
	// 	"excludeNew": false,
	// 	"newClass": "col-xs-6",
	// 	//filters
	// 	"filterApplied": 'includes',
	// 	"filterValue": null
	// },
		{
	   	"label": "Days In Pipeline",
	    "key": "daysInPipeline",
	    "type": "dynamicDays",
	    "dynamicKey": "createdOn",
	    "locked": true,

	   	//custom query logic fields
	    "useSortKey": true,
	    "sortKeyASC": "createdOn ASC",
	    "sortKeyDESC": "createdOn DESC",

	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"excludeImport": true,
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
	// {
	//    	"label": "Days In Stage",
	//     "key": "daysInStage",
	//     "type": "dynamicDays",
	//     "dynamicKey": "lastStageChange",
	//     "locked": true,
	//     //grid
	//     "excludeGrid": false,
 //    	"hide": false,
 //    	"width": 80,
	// 	"valueGetter": null,
	// 	"cellRenderer": null,
	// 	"pinned": false,

	// 	"excludeImport": true,
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
	   	"label": "Open Tasks",
	    "key": "openActivitiesCount",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"excludeImport": true,
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
	    "key": "overdueActivitiesCount",
	    "type": "number",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"excludeImport": true,
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
	    "type": "date",
	    "locked": true,
	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 80,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": false,

		"excludeImport": true,
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


		"excludeImport": true,
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
		"excludeBulk": true,
		"excludeGrid": false,
		"hide": false,
		"width": 250,
		"valueGetter": null,
		"cellRenderer": "contactNameRender",
		"pinned": 'left',
		//exlude import
	    "excludeImport": true
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
		"newClass": "col-xs-6",
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
		"newClass": "col-xs-6",
	    //grid specifics
		"newRequired": true,
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
	    "lookupKey": "name",
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
		"cellRenderer": null,
		"pinned": null
	},

	{
	   	"label": "Description",
	    "key": "description",
	    "type": "textarea",
	    "locked": false,
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
	    "type": "email",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",

		"columnType": "email",
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
	    "type": "phone",

	    "columnType": "phone",
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
	    "type": "social",

	    "columnType": "social",
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
	   	"label": "Addresses",
	    "key": "addresses",
	    "type": "address",

	    "columnType": "address",
	    // sorting
	    "useSortKey": true,
	    "sortKeyASC": "addressCount ASC",
	    "sortKeyDESC": "addressCount DESC",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",

		"excludeFilters": true,

	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	//address count
	{
	   	"label": "Addresses Count",
	    "key": "addressesCount",
	    "type": "number",

	    "excludeForm": true,
	    "excludeNew": true,
	    "excludeGrid": true,
	},

	//address parts used for filtering

	{
	   	"label": "City",
	    "key": "address.city",
	    "type": "string",
		"excludeNew": true,
		"excludeForm": true,
	    "excludeGrid": true,
	    		//exlude import
	    "excludeImport": true
	},

	{
	   	"label": "State",
	    "key": "address.state",
	    "type": "string",
		"excludeNew": true,
		"excludeForm": true,
	    "excludeGrid": true,
	    		//exlude import
	    "excludeImport": true
	},

	{
	   	"label": "Country",
	    "key": "address.country",
	    "type": "lookup",
	    "lookupEntity": "countryList",
		"excludeNew": true,
		"excludeForm": true,
	    "excludeGrid": true,
	    		//exlude import
	    "excludeImport": true
	},

	{
	   	"label": "Zip",
	    "key": "address.zip",
	    "type": "string",
		"excludeNew": true,
		"excludeForm": true,
	    "excludeGrid": true,
	    		//exlude import
	    "excludeImport": true
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
		"newRequired": true,
	   	//grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 300,
		"valueGetter": null,
		"cellRenderer": 'companyNameRender',
		"pinned": 'left'
	},
	{
	   	"label": "Domain",
	    "key": "domain",
	    "type": "domain",
	    "columnType": "domain",
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
	},

	{
	   	"label": "Social Accounts",
	    "key": "socialAccounts",
	    "type": "social",

	    "columnType": "social",
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
	   	"label": "Addresses",
	    "key": "addresses",
	    "type": "address",

	    "columnType": "address",
	    // sorting
	    "useSortKey": true,
	    "sortKeyASC": "addressCount ASC",
	    "sortKeyDESC": "addressCount DESC",
	    //new form
		"excludeNew": false,
		"newClass": "col-xs-12",

		"excludeFilters": true,

	    //grid
	    "excludeGrid": false,
    	"hide": false,
    	"width": 200,
		"valueGetter": null,
		"cellRenderer": null,
		"pinned": null
	},

	//address count
	{
	   	"label": "Addresses Count",
	    "key": "addressesCount",
	    "type": "number",

	    "excludeForm": true,
	    "excludeNew": true,
	    "excludeGrid": true,
	},
])


.constant("EndFields", [

	{
		"label": "Tags",
		"key": "tags",
		"type": "lookup",
		"columnType": "tags",
		"lookupEntity": "Tag",
		
		"groupByKey": "firstName",
	    "groupByLabel": "id",

		//sorting
		"useSortKey": true,
	    "sortKeyASC": "tagsCount ASC",
	    "sortKeyDESC": "tagsCount DESC",
		//grid
		"excludeGrid": false,
		"hide": false,
		"width": 300,
		"valueGetter": null,
		"cellRenderer": 'tagsRender',
		"pinned": false,
		//bulk
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Last Interaction",
		"key": "lastInteraction",
		"type": "date",
		"columnType": "date",
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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Last Interaction By",
		"key": "interactionBy",
		"type": "string",
		"columnType": "user",
		"disabled": true,

		//grouping
		"groupByKey": "firstName",
	    "groupByLabel": "id",

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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Updated On",
		"key": "updatedOn",
		"type": "date",
		"columnType": "date",
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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Updated By",
		"key": "updatedBy",
		"colId": "updatedBy",
	    "type": "lookup",
	    "lookupEntity": "Appuser",
		"columnType": "user",
		"disabled": true,
		//group
	    "groupByKey": "updatedBy.id",
	    "groupByLabel": "firstName",

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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Created On",
		"key": "createdOn",
		"type": "date",
		"disabled": true,
		"columnType": "date",
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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	},

	{
		"label": "Created By",
		"key": "createdBy",
		"colId": "createdBy",
		"columnType": "user",
	    "type": "lookup",
	    "lookupEntity": "Appuser",

	    "groupByKey": "createdBy.id",
	    "groupByLabel": "firstName",

	    "useSortKey": true,
	    "sortKeyASC": "createdBy.firstName ASC",
	    "sortKeyDESC": "createdBy.firstName DESC",

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
		"excludeBulk": true,
		//exlude import
	    "excludeImport": true
	}

])


