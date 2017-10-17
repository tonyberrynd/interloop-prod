angular.module('interloop.value.featureFlags', [])

// FOR NOW - THIS IS A LIST OFF ALL THE FEATURE FLAGS
//---------------------------------------------------

.value("FeatureFlags", [
	{"key": "feature1",
	 "name": "Feature Flag 1",
	 "active": true,
	 "description": "Description for feature 1"
	},
	{"key": "feature2",
	 "name": "Feature Flag 2",
	 "active": true,
	 "description": "Description for feature 2"
	}
]);
