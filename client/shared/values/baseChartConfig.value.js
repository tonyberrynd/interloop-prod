angular.module('interloop.value.baseChartConfig', [])

// Basic Chart Config - Can Be extended in the controller for what you need
//---------------------------------------------------

//used to configure which entities are available
.constant("BaseChartConfig", {
	global: {
	    useUTC: false
	 },
	colors: ['#6609EF', '#2648E2', '#57A1F1', '#51D4CD', '#67E07F', '#F5BE52', '#F09F4A'],
	chart: {
		marginBottom: 85,
		spacingBottom: 25,
		marginRight:25,
		marginTop:50,
		style: {
            fontFamily: 'proxima-nova'
        },
        zoomType: 'xy'
	},
	title: {
	  text: null
	},
	credits: {
    	enabled: false
    },
    plotOptions: {
        line: { /* or spline, area, series, areaspline etc.*/
            marker: {
               enabled: false
            }
        },
        spline: { /* or spline, area, series, areaspline etc.*/
            marker: {
               enabled: false
            }
        }
    },
    lang: {
        noData: 'No Results, Please Select a Different Filter or Time Period'
    },
    noData: {
        style: {
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#303030'
        }
    },
    xAxis: {
    	gridLineColor: '#E1E8ED',
    	title: {
    		margin: 25,
            style: {
                color: '#292F33',
                textTransform: 'uppercase',
                fontWeight: 600
            }
        },
    	labels: {
    		y: 25,
            style: {
                color: '#66757F',
            }
        }
    },
    yAxis: {
    	gridLineColor: '#E1E8ED',
    	title: {
    		margin: 25,
            style: {
                color: '#292F33',
                textTransform: 'uppercase',
                fontWeight: 600
            }
        },
    	labels: {
            style: {
                color: '#66757F',
            }
        }
    },
    legend: {
	   layout: 'horizontal',
	   align: 'right',
	   verticalAlign: 'top',
	   y: -10,
	   x: 0,
	   floating: true,
	   backgroundColor: '#FFFFFF'
	},
	tooltip: {
        useHTML: true,
        style: {
        	color: '#FFFFFF',
        	fontSize: '15px'
        }
    },
	series: []
});