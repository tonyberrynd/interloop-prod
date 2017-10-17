angular.module('interloop.factory.excelGenerator', [])

.factory('excelGenerator', function($rootScope, $log, $injector, EndFields) {

    var excelGenerator = {
        createImportTemplate: createImportTemplate
    };

    return excelGenerator;

    ////////

    function createImportTemplate(entity){


    	//creates headers
    	var entityFields = _.filter($injector.get(entity + 'Fields'),function(o){
            return !o.excludeImport;
        })

    	var customFields = _.filter($rootScope.customFields,function(o){
            return _.includes(o.useWith, entity) && o.type !== 'divider' && !o.excludeImport;
        })
        //end fields
        var endFields = _.filter(EndFields,function(o){
            return !o.excludeImport;
        })
        //set up fields for filters
        var fields = _.union(entityFields, customFields, endFields);

    	//create keys for each of the fields
    	var dataHeader = [{}];
    	//set each to null so no data in the first row - just want to generate headers
    	_.forEach(fields, function(value, key){
    		if(value.label) { dataHeader[0][value.label] = '' };
    	})

		/* generate a worksheet */
		var ws = XLSX.utils.json_to_sheet(dataHeader);

		//TODO - add validation

		/* add to workbook */
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Import");

		/* write workbook (use type 'binary') */
		var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "import-template.xlsx");

	}

		/* generate a download */
	function s2ab(s) {
	  var buf = new ArrayBuffer(s.length);
	  var view = new Uint8Array(buf);
	  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	  return buf;
	}


});


