angular.module('coil.value.baseChartConfig', [])

// Basic Chart Config - Can Be extended in the controller for what you need
//---------------------------------------------------

//used to configure which entities are available
.constant("BaseChartConfig", {
	global: {
	    useUTC: false
	 },
	colors: ['#0084f3', '#09BEF2', '#3F73C7', '#08C9BE', '#214580', '#FF9600', '#7B27C9', '#82CD00'],
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
    	gridLineColor: '#F4F5F7',
    	title: {
    		margin: 25,
            style: {
                color: '#344563',
                textTransform: 'uppercase',
                fontWeight: 600
            }
        },
    	labels: {
    		y: 25,
            style: {
                color: '#97A0AF',
            }
        }
    },
    yAxis: {
    	gridLineColor: '#F4F5F7',
    	title: {
    		margin: 25,
            style: {
                color: '#344563',
                textTransform: 'uppercase',
                fontWeight: 600
            }
        },
    	labels: {
            style: {
                color: '#97A0AF',
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