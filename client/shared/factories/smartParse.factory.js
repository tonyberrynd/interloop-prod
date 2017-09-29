angular.module('interloop.factory.smartParse', [])

.factory('SmartParse', function($http, $window) {

    var SmartParse = {
    	parse_date: parse_date,
    	parse_words: parse_words,
        get_bigrams: get_bigrams,
        string_similarity: string_similarity
    };

    return SmartParse;

    ////////

    /*
    Parses Date
    */
    function parse_date(string) {
    	return chrono.parse(string);
    }

    /*
    Parse String Looks for Words (Exact & Fuzzy Matching) - if match, returns match
    */
    function parse_words(string, activityTypes) {
		//break down string into words
		var words = _.words(_.toLower(string));
		//get types from passed in pick list items
		var types = activityTypes;
		// check if word showed by in string
		var returnValue = null;

		_.forEach(types, function(type, key) {

				//first check if word was included
				if(_.includes(words,_.toLower(type.label))) {
					returnValue = type;
					return false;
				}
				// if not, then see if any words are similar
				else {
					_.forEach(words, function(wordValue, key) {
						console.log('Doesnt include  word');
						//checks if similarity of works
						if(string_similarity(wordValue, type.label) > .65) {
							returnValue = type;
							return false;	
						} else {
							returnValue = null;
							return false;
						}
						
					})
				}
		});

		return returnValue;
	}

	/*
	Checkes relevance of comparable words
	*/
	//break down string
	function get_bigrams(string) {
	  var i, j, ref, s, v;
	  s = string.toLowerCase();
	  v = new Array(s.length - 1);
	  for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
	    v[i] = s.slice(i, i + 2);
	  }
	  return v;
	};


	/*
	determine similarities
	*/
	function string_similarity(str1, str2) {
	  var hit_count, j, k, len, len1, pairs1, pairs2, union, x, y;
	  if (str1.length > 0 && str2.length > 0) {
	    pairs1 = get_bigrams(str1);
	    pairs2 = get_bigrams(str2);
	    union = pairs1.length + pairs2.length;
	    hit_count = 0;
	    for (j = 0, len = pairs1.length; j < len; j++) {
	      x = pairs1[j];
	      for (k = 0, len1 = pairs2.length; k < len1; k++) {
	        y = pairs2[k];
	        if (x === y) {
	          hit_count++;
	        }
	      }
	    }
	    if (hit_count > 0) {
	      return (2.0 * hit_count) / union;
	    }
	  }
	  return 0.0;
	};

 });