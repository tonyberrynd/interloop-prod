angular.module('interloop.factory.tagManager', [])

.factory('TagManager', function($rootScope, $q, modalManager, $log, Tag, Logger) {

    var TagManager = {
        getEntityTags: getEntityTags, 
        manageTags: manageTags
    };

    return TagManager;

    //get stags for this entity 
    function getEntityTags(entityName, searchValue){
         searchValue = searchValue || ""; 
         var filter = {
            "where":{
                "name":{"like": searchValue + ".*", "options":"i"}, 
                "useWith": entityName
            }, 
            "fields":["name","id"]
        }; 

        return Tag.find({"filter": filter}).$promise
    }

    function manageTags(entityItem, entityType, entityTags) {

        var resolvedData = {
            entity: entityItem, //used by Modal to understand where to link tag 
            entityType: entityType, 
            tags: entityTags
        }

        //prevents double modal - do nothing if already set to true 
        var manageTagsModal = modalManager.openModal('manageTags', resolvedData);

        //result on closing modal
        return manageTagsModal.result
    }; 
}); 