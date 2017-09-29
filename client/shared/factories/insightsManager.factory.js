angular.module('interloop.factory.insightManager', [])

//TB - TODO may want to change factory name to viewManager to be consistent 

.factory('InsightManager', function($rootScope, $injector, $q, Logger, View, Appuser, Insight) {

    //factory object
    var InsightManager = { 
        getThisInsight: getThisInsight,
    };


    //DEFAULT TOOLTIP FOR REFERENCE
    //---------------------------------
    // "<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>"

       //TODO - MOVE SERVER side
    var insightsConfig = [

	    {
	    	"id": "123534532",
	    	"key": "opp-risk-matrix",
	    	"label": "Opportunity Risk Matrix",
	    	"question": "Which of our opportunities are at risk?",
	    	"chartTypes": ['bubble', 'bar'],
	    	"dataTypes": ['standard', 'cumulative'], 
	    	"chartConfig": {
	    		"yAxis": {
			        floor: 0,
			        ceiling: 100,
			        title: {
			            text: 'Smart Score'
			        }
			    },
			    "xAxis": {
           		 	min: moment().startOf('year').subtract(5, 'days').valueOf(),
            		max: moment().endOf('year').add(5, 'days').valueOf(),
			    	type: 'datetime',
			    	minTickInterval: moment.duration(1, 'months').milliseconds(),
			        title: {
			            text: 'Estimated Close'
			        },
			        labels: {
				        formatter: function() {
				          return moment(this.value).format("MMM D 'YY");
				        }
				    }
			    },
			    "plotOptions": {
			    	"bubble": {
			    		minSize: 15,
			    		maxSize: 150
			    	}
			    },
			    "tooltip": {
		            formatter: function() {
		            	//build tooltip here
		            	var html = '<span style="margin-right: 5px; margin-top:25px; font-size:18px; color:' + this.point.color + '">\u25CF</span>';
		            		html += '<b style="font-size:18px;">' + this.point.name + '</b>';
		            		html += '</br>';
		            		html +=  '<span style="margin-left:15px;">' + this.point.primaryCompany + '</span>'
		            		html += '</br>';
		            		html += '</br>';
		            		html += '<div style="margin-left:15px; padding-right:15px;">';
		            		html += '<small><b>Value: </b> ' + this.point.z + '</small>';
		            		html += '</br>';
		            		html += '<small><b>Stage: </b> ' + this.point.stage + '</small>';
		            		html += '</br>';
		            		html += '<small><b>Forecast: </b> ' + this.point.forecast + '</small>';
		            		html += '</div>';
		            		html += '<br>';
		            	//return tooltip
		                 return html
		            }
		        },
			    "series": [{
			    	"id": 'low-score',
			    	"name": "Low Score (<40)",
			    	"color": "#ED3251",
			        "data": []
			    },
			    {
			    	"id": 'medium-score',
			    	"name": "Medium Score (>40 & <60)",
			    	"color": "#FDDE00",
			        "data": []
			    },
			    {
			    	"id": 'high-score',
			    	"name": "High Score (>60)",
			    	"color": "#26AB40",
			        "data": []
			    }]
	    	},
	    	"columnDefs": [
  				{headerName: "Name", field: "name", width:400, pinned: true},
  				{headerName: "Primary Company", field: "primaryCompany", width:250},
  				{headerName: "Value", field: "z", width:250},
  				{headerName: "Stage", field: "stage", width:250},
  				{headerName: "Forecast", field: "forecast", width:250},
  				{headerName: "Updated On", field: "updatedOn", width:250},
  				{headerName: "Created On", field: "createdOn", width:250}
	    	]
	   },
	   {
	    	"id": "0923847",
	    	"key": "current-forecasts",
	    	"label": "Current Forecasts",
	    	"question": "What Is Our Current Forecast?",
	    	"chartTypes": ['bar'],
	    	"dataTypes": ['By Period', 'By Sales Professional'], 
	    	"chartConfig": {
	    		"yAxis": {
			        "title": {
			            text: 'Value'
			        }
			    },
			    "xAxis": {
			    	labels: {
			    		y: 5
			    	},
			        title: {
			            text: 'Sales Profesional',
			        },
					min: 0,
			        max: 8,
			        scrollbar: {
			            enabled: true
			        },
			        categories: ['John', 'Jane', 'Joe', 'jill', 'susan', 'jeff', 'tony', 'jordan', 'chris', 'ali', 'kial', 'nick', 'arron', 'alexa', 'jeff', 'John', 'Jane', 'Joe', 'jill', 'susan', 'jeff', 'tony', 'jordan', 'chris', 'ali', 'kial', 'nick', 'arron', 'alexa', 'jeff']
			    },
			    "plotOptions": {
			    	series: {
			            stacking: 'normal'
			        }
			    },
			    "series": [{
			    	"id": 'commit',
			    	"name": "Commit",
			        "data": []
			    },
			    {
			    	"id": 'upside',
			    	"name": "Upside",
			        "data": []
			    },
			    {
			    	"id": 'downside',
			    	"name": "Downside",
			        "data": []
			    }]
			}
		},
		{
	    	"id": "0982347",
	    	"key": "bookings-forecast",
	    	"label": "Bookings Forecast",
	    	"question": "What is our bookings forecast?",
	    	"chartTypes": [],
	    	"dataTypes": ['stacked', 'normal'], 
	    	"chartConfig": {
	    		"plotOptions": {
			        "column": {
			            "stacking": 'normal'
			        }
			    },
				"xAxis": {
			        "categories": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			        "title": {
			        	"text": "Estimated Close"
			        },
			         "plotLines": [{
			            color: '#FB7C50',
			            width: 1,
			            value: 5,
			            zIndex: 1,
			            label: {
			            	rotation: 90,
		                	text: 'Today',
			                style: {
			                    color: '#FB7C50',
			                    fontWeight: 'bold'
			                }
		            	}
			        }]
			    },
			    "yAxis": {
			        "title": {
			        	"text": "Value"
			        }
			    },
			    "series": [{
			    	"id": 'stars-align',
			    	"name": "Stars Align",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'likely',
			    	"name": "Likely",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'hard-commit',
			    	"name": "Hard Commit",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'hard-commit',
			    	"name": "Hard Commit",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'closed',
			    	"name": "Closed",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'goal',
			    	"name": "Goal",
			    	"type": "line",
			    	"color":"#57A1F1",
			    	"zIndex": 6,
			        "data": []
			    },
			    {
			    	"id": 'forecasted-value',
			    	"name": "Forecasted Value",
			    	"type": "spline",
			    	"zIndex": 5,
			    	"zoneAxis": 'x',
		         		"zones": [
				         	{ 
				         		"value": 5,
				         		"color": "#DDDDDD"
				         	}, 
					        {
					        	"dashStyle": "Dash",
					        	"color": "#57A1F1"
					    	}],
					    "data": []
			 	}, 
			 	{
			 		"id": 'prediction-range',
			    	"name": "Predicted Range",
			    	"type": "areasplinerange",
			    	"lineWidth": 0,
			        "linkedTo": ':previous',
			        "color": "#E1E8ED",
			        "zoneAxis": 'x',
	         		"zones": [
		         		{
		            	  value: 5
				        }, 
				        {
				          color: '#70AFF3'
				       	}],
			          "data": []
			    }]
	    	}
	    },
	    {
	    	"id": "0283480",
	    	"key": "revenue-forecast",
	    	"label": "Revenue Forecast",
	    	"question": "What Is Our Revenue Forecast?",
	    	"chartTypes": [],
	    	"dataTypes": ['stacked', 'normal'], 
	    	"chartConfig": {
	    		"plotOptions": {
			        "column": {
			            "stacking": 'normal'
			        }
			    },
				"xAxis": {
			        "categories": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			        "title": {
			        	"text": "Estimated Close"
			        },
			         "plotLines": [{
			            color: '#FB7C50',
			            width: 1,
			            value: 5,
			            zIndex: 1,
			            label: {
			            	rotation: 90,
		                	text: 'Today',
			                style: {
			                    color: '#FB7C50',
			                    fontWeight: 'bold'
			                }
		            	}
			        }]
			    },
			    "yAxis": {
			        "title": {
			        	"text": "Value"
			        }
			    },
			    "series": [{
			    	"id": 'stars-align',
			    	"name": "Stars Align",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'likely',
			    	"name": "Likely",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'hard-commit',
			    	"name": "Hard Commit",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'hard-commit',
			    	"name": "Hard Commit",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'closed',
			    	"name": "Closed",
			    	"type": "column",
			        "data": []
			    },
			    {
			    	"id": 'goal',
			    	"name": "Goal",
			    	"type": "line",
			    	"color":"#57A1F1",
			    	"zIndex": 6,
			        "data": []
			    },
			    {
			    	"id": 'forecasted-value',
			    	"name": "Forecasted Value",
			    	"type": "spline",
			    	"zIndex": 5,
			    	"zoneAxis": 'x',
		         		"zones": [
				         	{ 
				         		"value": 5,
				         		"color": "#DDDDDD"
				         	}, 
					        {
					        	"dashStyle": "Dash",
					        	"color": "#57A1F1"
					    	}],
					    "data": []
			 	}, 
			 	{
			 		"id": 'prediction-range',
			    	"name": "Predicted Range",
			    	"type": "areasplinerange",
			    	"lineWidth": 0,
			        "linkedTo": ':previous',
			        "color": "#E1E8ED",
			        "zoneAxis": 'x',
	         		"zones": [
		         		{
		            	  value: 5
				        }, 
				        {
				          color: '#70AFF3'
				       	}],
			          "data": []
			    }]
	    	}
	    },
	   	{
	    	"id": "08698",
	    	"key": "opp-momentum",
	    	"label": "Opportunity Momentum",
	    	"question": "How is our pipeline progressing?",
	    	"chartTypes": ['bubble'],
	    	"dataTypes": ['activity', 'forecast', 'none'], 
	    	"chartConfig": {
	    		"yAxis": {
	    			"reversed": true,
			        "title": {
			            text: 'Weeks In Stage'
			        },
			        min:0,
			        max: 16
			    },
			    "xAxis": {
			        title: {
			            text: 'Stage',
			        },
			        categories: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
			        min: 0,
			        max:4,
			     "plotBands": [{
				    color: '#EFF3F6', // Color value
				    opacity: .5,
				    from: 2.5, // Start of the plot band
				    to: 3.5 // End of the plot band
				 },
				 {
				    color: '#EFF3F6', // Color value
				    opacity: .5,
				    from: 0.5, // Start of the plot band
				    to: 1.5 // End of the plot band
				 }],
			    },
			    "plotOptions": {
			    	"bubble": {
			    		minSize: 15,
			    		maxSize: 150
			    	}
			    },
			    "series": [{
			    	"id": 'open-opps',
			    	"name": "Open Opportunities",
			        "data": []
			    }]
			}
		},
		{
	    	"id": "209384",
	    	"key": "opp-flow",
	    	"label": "Opportunity Flow",
	    	"question": "How has our pipeline changed over time?",
	    	"chartTypes": ['sankey'],
	    	"dataTypes": ['sales process', 'forecast categories'], 
	    	"chartConfig": {
	    		"plotOptions": {},
	    		"series": [{
		    		"id":"changed-opps",
			        "keys": ['from', 'to', 'weight', 'toColor', 'fromColor', 'cubeColor'],
			        "data": []
			    }]
	    	}
		},
		{
	    	"id": "0928347",
	    	"key": "activity-tracker",
	    	"label": "Activity Tracker",
	    	"question": "What is our activity volume over time?",
	    	"chartTypes": ['line', 'bar', 'area'],
	    	"dataTypes": ['Overall', 'Opportunities', 'Companies', 'Contacts'], 
	    	"chartConfig": {
	    		"plotOptions": {
	    			line: { /* or spline, area, series, areaspline etc.*/
			            marker: {
			               enabled: true
			            }
			        }
	    		},
	    		"xAxis": {
           		 	"categories": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
           		 	"title": {
           		 		"text": null
           		 	}
			    },
			    "yAxis": {
			        "title": {
			            text: 'Activity Volume'
			        }
			    },
	    		"series": [{
		    		"id":"emails-sent",
		    		"name":"Emails Sent",
			        "data": []
			    },
			    {
		    		"id":"emails-recieved",
			        "name":"Emails Recieved",
			        "data": []
			    },
			    {
		    		"id":"meetings-held",
			        "name":"Meetings Held",
			        "data": []
			    },
			    {
		    		"id":"meetings-booked",
			        "name":"Meetings Booked",
			        "data": []
			    },
			    {
		    		"id":"calls-made",
			        "name":"Calls Made",
			        "data": []
			    }]
	    	}
		},
		{
	    	"id": "209384",
	    	"key": "sales-cycle",
	    	"label": "Sales Cycle",
	    	"question": "How long is our current sales cycle?",
	    	"chartTypes": ['column'],
	    	"dataTypes": ['Over Time', 'By Sales Professional', 'By Won/Lost'], 
	    	"chartConfig": {
	    		"plotOptions": {
			        "column": {
			            "stacking": 'normal'
			        }
			    },
	    		"xAxis": {
           		 	"categories": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
           		 	"title": {
           		 		"text": null
           		 	}
			    },
			    "yAxis": {
           		 	"title": {
           		 		"text": "Days In Pipeline"
           		 	}
			    },
	    		"series": [{
		    		"id":"stage1",
		    		"name":"Stage 1",
		    		"type":"column",
			        "data": []
			    },
			    {
		    		"id":"stage2",
		    		"name":"Stage 2",
		    		"type":"column",
			        "data": []
			    },
			    {
		    		"id":"stage3",
		    		"name":"Stage 3",
		    		"type":"column",
			        "data": []
			    },
			    {
		    		"id":"stage4",
		    		"name":"Stage 4",
		    		"type":"column",
			        "data": []
			    },
			    {
		    		"id":"stage5",
		    		"name":"Stage 5",
		    		"type":"column",
			        "data": []
			    }]
	    	}
		},
		{
	    	"id": "0928347",
	    	"key": "forecast-accuracy",
	    	"label": "Forecast Accuracy",
	    	"question": "How accurate are forecast submissions?",
	    	"chartTypes": ['heatmap'],
	    	"dataTypes": ['Bookings', 'Revenue'], 
	    	"chartConfig": {
	    		"plotOptions": {},
			    "xAxis": {
			        categories: ['Q3-16', 'Q4-16', 'Q1-17', 'Q2-17', 'Q3-17', 'Q4-17'],
			        title: {
			        	text: 'Forecast Period'
			        }
			    },

			    "yAxis": {
			        categories: ['Joe', 'Susan', 'William', 'Zack'],
			        title: {
			        	text: 'Sales Professional'
			        }
			    },
				"series": [{
						id: 'accuracy',
				        name: 'Accuracy per Period',
				        borderWidth: 1,
				        data: [],
				        dataLabels: {
				            enabled: true,
				            color: '#000000'
				        }
				}]
	    	}
		},
		{
	    	"id": "089234",
	    	"key": "forecast-close",
	    	"label": "Forecast To Close",
	    	"question": "How are we doing compared to past quarters at the same time?",
	    	"chartTypes": ['column'],
	    	"dataTypes": ['forecast-categories', 'status'], 
	    	"chartConfig": {
	    		plotOptions: {},
			   	"xAxis": {
			        categories: ['Q3-16', 'Q4-16', 'Q1-17', 'Q2-17', 'Q3-17', 'Q4-17'],
			        title: {
			        	text: 'Forecast Period'
			        }
			    },
	    		"series": [{
		    		"id":"q1-start",
			        "data": []
			    },
			    {
		    		"id":"q1-end",
			        "data": []
			    }]
	    	}
		},

    ];


   var insightsData = [

	   	{
	   		"key": "opp-risk-matrix",
	   		"series": [
	   			{
	   			"id": "low-score",
	   			"data": [
	            	{ x: moment('2017-01-25').valueOf(), y: 13, z: 50, name: 'Opp 1', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-02-25').valueOf(), y: 25, z: 1000, name: 'Opp 2', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-03-30').valueOf(), y: 24, z: 700, name: 'Opp 3', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-04-30').valueOf(), y: 2, z: 33, name: 'Opp 4', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-05-21').valueOf(), y: 25, z: 3000, name: 'Opp 5', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-06-22').valueOf(), y: 56, z: 25, name: 'Opp 6', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-07-05').valueOf(), y: 25, z: 1200, name: 'Opp 7', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-07-25').valueOf(), y: 39, z: 1500, name: 'Opp 8', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-09-23').valueOf(), y: 12, z: 1000, name: 'Opp 9', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-10-19').valueOf(), y: 14, z: 1345, name: 'Opp 10', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-10-03').valueOf(), y: 28, z: 3560, name: 'Opp 11', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-08-25').valueOf(), y: 36, z: 6580, name: 'Opp 12', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-02-05').valueOf(), y: 25, z: 1200, name: 'Opp 7', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-01-12').valueOf(), y: 39, z: 1500, name: 'Opp 8', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-09-23').valueOf(), y: 12, z: 1000, name: 'Opp 9', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-11-25').valueOf(), y: 14, z: 1345, name: 'Opp 10', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-04-25').valueOf(), y: 28, z: 3560, name: 'Opp 11', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' },
	            	{ x: moment('2017-06-25').valueOf(), y: 36, z: 6580, name: 'Opp 12', primaryCompany: 'Big company A', stage: 'Stage 3', forecast: 'Commit' }
				]
			},
			{
			"id": "medium-score",
			"data": [
				{ x: moment('2017-02-23').valueOf(), y: 46, z: 100, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-04-23').valueOf(), y: 52, z: 3000, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-06-23').valueOf(), y: 66, z: 3600, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-06-23').valueOf(), y: 65, z: 4569, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-06-23').valueOf(), y: 80, z: 66480, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-08-23').valueOf(), y: 65, z: 4349, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-01-23').valueOf(), y: 48, z: 9283, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-02-12').valueOf(), y: 46, z: 100, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-04-15').valueOf(), y: 52, z: 3000, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-09-23').valueOf(), y: 66, z: 3600, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-03-29').valueOf(), y: 65, z: 10000, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-01-16').valueOf(), y: 80, z: 9037, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-04-04').valueOf(), y: 65, z: 9999, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },
				{ x: moment('2017-12-21').valueOf(), y: 48, z: 9283, name: 'Opp 2', primaryCompany: 'Big company B', stage: 'Stage 5', forecast: 'Stars Align' },

				]
			},
			{
			"id": "high-score",
			"data": [
				{ x: moment('2017-01-15').valueOf(), y: 65, z: 2000, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-03-10').valueOf(), y: 70, z: 3400, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-07-28').valueOf(), y: 85, z: 5400, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-09-25').valueOf(), y: 92, z: 1234, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-09-25').valueOf(), y: 82, z: 3900, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-10-15').valueOf(), y: 76, z: 1934, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-11-25').valueOf(), y: 72, z: 4550, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-12-12').valueOf(), y: 68, z: 2345, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-02-25').valueOf(), y: 88, z: 10000, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-03-25').valueOf(), y: 82, z: 7384, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-09-15').valueOf(), y: 76, z: 1934, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-01-25').valueOf(), y: 72, z: 4550, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-02-12').valueOf(), y: 68, z: 30349, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
				{ x: moment('2017-04-25').valueOf(), y: 88, z: 9847, name: 'Opp 3', primaryCompany: 'Big company C', stage: 'Stage 1', forecast: 'Most Likely' },
			   ]
			}]

		},	
		{
	   		"key": "current-forecasts",
	   		"series": [{
	   				id: 'commit',
		        	name: 'Commit',
			        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2]
			    }, {
			    	id: 'upside',
			        name: 'Upside',
			        data: [2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2]
			    }, {
			    	id: 'downside',
			        name: 'Downside',
			        data: [3, 4, 4, 2, 5, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 3, 4, 4, 2, 5, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2]
			    }
			]
		},
		{
			"key": "bookings-forecast",
			"series": [
				{
					"id": "stars-align",
				    "data": [0, 0, 0, 0, 0, 40, 30, 30, 90, 60, 70, 90],
				},
				{
					"id": "likely",
				    "data": [0, 0, 0, 0, 0, 30, 40, 0, 20, 10, 20, 40],
				},
				{
				    "id": "hard-commit",
				    "data": [0, 0, 0, 0, 0, 20, 40, 50, 80, 30, 50, 60],
				},
		    	{
				    "id": "closed",
				    "data": [40, 30, 30, 90, 10, 20, 0, 0, 0, 0, 0, 0],
				},
				{
			    	"id": "goal",
			        "data": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		    	},
		    	{
			    	"id": "forecasted-value",
			        "data": [65, 75, 62, 69, 58, 45, 85, 110, 100, 75, 175, 110],
		    	},
		    	{
			    	"id": "prediction-range",
			        "data": [['Jan',75,55],['Feb',85,65],['Mar',72,52],['Apr',79,59],['May',68,48],['Jun',55,35],['Jul',95, 75],['Aug',130, 90],['Sep',130, 80],['Oct',95, 65],['Nov',205, 145],['Dec',150, 70]]
		    	}
	    	]
		},
		{
			"key": "revenue-forecast",
			"series": [
				{
					"id": "stars-align",
				    "data": [0, 0, 0, 0, 0, 40, 30, 30, 90, 60, 70, 90],
				},
				{
					"id": "likely",
				    "data": [0, 0, 0, 0, 0, 30, 40, 0, 20, 10, 20, 40],
				},
				{
				    "id": "hard-commit",
				    "data": [0, 0, 0, 0, 0, 20, 40, 50, 80, 30, 50, 60],
				},
		    	{
				    "id": "closed",
				    "data": [40, 30, 30, 90, 10, 20, 0, 0, 0, 0, 0, 0],
				},
				{
			    	"id": "goal",
			        "data": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
		    	},
		    	{
			    	"id": "forecasted-value",
			        "data": [65, 75, 62, 69, 58, 45, 85, 110, 100, 75, 175, 110],
		    	},
		    	{
			    	"id": "prediction-range",
			        "data": [['Jan',75,55],['Feb',85,65],['Mar',72,52],['Apr',79,59],['May',68,48],['Jun',55,35],['Jul',95, 75],['Aug',130, 90],['Sep',130, 80],['Oct',95, 65],['Nov',205, 145],['Dec',150, 70]]
		    	}
	    	]
		},
		{
			"key": "opp-momentum",
			"series": [
				{
					"id": "open-opps",
				    "data": [
				    { x: .75, y: 2, z: 100, name: 'Test Opp' },
				    { x: 1, y: 4, z: 50, name: 'Test Opp' },
				    { x: 1.25, y: 3, z: 100, name: 'Test Opp' },
				    { x: 2.2, y: 6, z: 200, name: 'Test Opp' },
				    { x: 2.8, y: 3, z: 50, name: 'Test Opp' }
				    ],
				}
	    	]
		},
		{
			"key": "opp-flow",
			"series": [
				{
					"id":"changed-opps",
					"data": [
					  [
					    "start-stage1",
					    "stage1",
					    3,
					    "rgba(41, 128, 185,.5)",
					    "rgba(142, 68, 173,.5)",
					    "#3498db"

					  ],
					  [
					    "start-stage1",
					    "stage2",
					    8,
					    "rgba(41, 128, 185,.5)",
					    "rgba(22, 160, 133,.5)",
					    "rgba(41, 128, 185,.5)",
					  ],
					  [
					    "start-stage1",
					    "stage3",
					    10,
					    "rgba(41, 128, 185,.5)",
					    "rgba(44, 62, 80,.5)",
					    "rgba(41, 128, 185,.5)",
					  ],
					  [
					    "start-stage2",
					    "stage1",
					    0,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage2",
					    "stage2",
					    8,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage2",
					    "stage3",
					    10,
					    "rgba(39, 174, 96,.5)"
					  ],
					  [
					    "start-stage3",
					    "stage1",
					    0
					  ],
					  [
					    "start-stage3",
					    "stage2",
					    8
					  ],
					  [
					    "start-stage3",
					    "stage3",
					    10
					  ]
					]
				}
			]
		},
		{
			"key": "activity-tracker",
				"series": [{
		    		"id":"emails-sent",
		    		"name":"Emails Sent",
			        "data": [5, 10, 20, 40, 20, 20, 10, 5, 10, 5, 10, 30]
			    },
			    {
		    		"id":"emails-recieved",
			        "name":"Emails Recieved",
			        "data": [6, 23, 45, 65, 34, 23, 45, 76, 12, 12, 34, 45]
			    },
			    {
		    		"id":"meetings-held",
			        "name":"Meetings Held",
			        "data": [12, 14, 8, 4, 35, 37, 21, 34, 12, 14, 15, 16]
			    },
			    {
		    		"id":"meetings-booked",
			        "name":"Meetings Booked",
			        "data": [37, 21, 34, 12, 14, 15, 16, 12, 14, 8, 4, 35]
			    },
			    {
		    		"id":"calls-made",
			        "name":"Calls Made",
			        "data": [5, 6, 7, 8, 2, 3, 4, 5, 8, 1, 5, 3]
			    }]
		},{
			"key": "sales-cycle",
			"series": [{
		    		"id":"stage1",
		    		"name":"Stage 1",
			        "data": [5, 6, 7, 8, 4, 7, 3, 2, 9, 4, 6, 3]
			    },
			    {
		    		"id":"stage2",
		    		"name":"Stage 2",
			        "data": [5, 6, 7, 3, 5, 6, 9, 8, 4, 6, 5, 7]
			    },
			    {
		    		"id":"stage3",
		    		"name":"Stage 3",
			        "data": [6, 5, 7, 3, 5, 6, 9, 5, 6, 7, 8, 4]
			    },
			    {
		    		"id":"stage4",
		    		"name":"Stage 4",
			        "data": [7, 3, 5, 6, 9, 4, 6, 5, 8, 4, 3, 7]
			    },
			    {
		    		"id":"stage5",
		    		"name":"Stage 5",
			        "data": [8, 4, 6, 5, 5, 6, 7, 7, 3, 5, 6, 9]
			    }]
		},
		{
			"key": "forecast-accuracy",
			"series": [{
		    		"id":"accuracy",
		    		"name":"Accuracy",
			        "data": [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120]]			    
			    }]
		},
		{
			"key": "forecast-close",
			"series": [{
		    		"id":"q1-start",
		    		"name":"Q1 Start",
			        "data": []		    
			    },
			    {
		    		"id":"q1-end",
		    		"name":"Q1 End",
			        "data": []		    
			    },
			    {
		    		"id":"q2-start",
		    		"name":"Q2 Start",
			        "data": []		    
			    },
			    {
		    		"id":"q2-end",
		    		"name":"Q2 End",
			        "data": []		    
			    },
			    {
		    		"id":"q3-start",
		    		"name":"Q3 Start",
			        "data": []		    
			    },
			    {
		    		"id":"q3-start",
		    		"name":"Q3 End",
			        "data": []		    
			    },
			    {
		    		"id":"q4-start",
		    		"name":"Q4 Start",
			        "data": []		    
			    },
			    {
		    		"id":"q4-start",
		    		"name":"Q4 End",
			        "data": []		    
			    }]
		}
	];



	// { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },

    return InsightManager;

    //returns current view based on either viewId or 
    function getThisInsight(insightKey, view, query) {

    	//turns this initialization into a promise we can use in controllers
		//-----------------------------------------------------------------
		var defer = $q.defer();

		console.log(insightsConfig);
        var insightConfig = _.find(insightsConfig, ["key", insightKey]);
        console.log(insightConfig);
        var insightData = _.find(insightsData, ["key", insightKey]);
        console.log(insightData);


        // return Insight.retrieve({'key': insightKey, 'match': view || query || {}, 'type': 'mongo'}).$promise
        // 	.then(function(results){
        // 		console.log(results);
        // 	})
        // 	.catch(function(err){
        // 		console.log(err);
        // 	})

        var thisConfig = {
        	config: insightConfig,
        	data: insightData
        }  

       	//resolve the insight
        defer.resolve(thisConfig);

	    return defer.promise; 
    };



});
