angular.module('interloop.factory.excelGenerator', [])

.factory('excelGenerator', function($rootScope, $log, $injector, EndFields, socialTypes) {

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
            switch(value.type) {
                case 'email':
                    var emailIndexes = [1,2];
                    _.forEach(emailIndexes, function(value){
                        dataHeader[0]['email' + value + '_type'] = ''; //TODO - ADD DATAVALIDATION
                        dataHeader[0]['email' + value + '_value'] = '';
                    })
                    break;
                case 'phone':
                     var phoneIndexes = [1,2];
                    _.forEach(phoneIndexes, function(value){
                        dataHeader[0]['phone' + value + '_type'] = ''; //TODO - ADD DATAVALIDATION
                        dataHeader[0]['phone' + value + '_value'] = '';
                        dataHeader[0]['phone' + value + '_extension'] = '';
                    })
                    break;
                case 'address':
                    var addressIndexes = [1,2];
                    //add two address stubs
                    _.forEach(addressIndexes, function(value){
                        dataHeader[0]['address' + value + '_type'] = '';
                        dataHeader[0]['address' + value + '_street1'] = '';
                        dataHeader[0]['address' + value + '_street2'] = '';
                        dataHeader[0]['address' + value + '_city'] = '';
                        dataHeader[0]['address' + value + '_region'] = '';
                        dataHeader[0]['address' + value + '_postal_code'] = '';
                        dataHeader[0]['address' + value + '_country'] = '';
                    })
                    break;
                case 'social':
                    _.forEach(socialTypes, function(value){
                        dataHeader[0][value.key] = ''
                    })
                    break;
                // case 'category':
                //     //TODO - add data validation to only allow category values
                //     break;
                default:
                    //just add key so can be recognized
                    if(value.key) { dataHeader[0][value.key] = '' };
            }
    		
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


