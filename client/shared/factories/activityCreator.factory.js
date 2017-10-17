angular.module('interloop.factory.activityCreator', [])


.factory('activityCreator', function(
    $rootScope, 
    $q,
    RelationshipManager,
    Activity) {

    //service object
    var activityCreator = {
        createActivity: createActivity
    };

    return activityCreator;

    /////////////////////////////////////////

    // [ACTIVITY TYPES] = Task, Meeting, Email, Note, Files, Changelog, etc

    //creates activity and links it to an entity item
    function createActivity(type, activityDetails, completed, entityItem, entityType) {

          var thisActivity = activityDetails || {};
              thisActivity.type = type || 'activity';
              thisActivity.completed = completed ? true : false;
              thisActivity.completedDate = completed ? moment().format() : null;
              //created by
              thisActivity.createdBy = {
                firstName: $rootScope.activeUser.firstName,
                lastName: $rootScope.activeUser.lastName,
                initials: $rootScope.activeUser.initials,
                color: $rootScope.activeUser.color
              };

            //create activity promise
            return Activity.create(thisActivity).$promise
                    .then(function(activity) { 
                     //real time history push
                     if(entityItem) { 
                        //create entity item
                        entityItem.history.push(thisActivity)
                        //link this activity to this opp
                        return RelationshipManager.linkActivity(activity.id, entityItem.id, entityType, 
                            {
                              "activity": {
                                "name": activity.name || activity.title,
                                "type": "file", 
                                "completed": activity.completed
                                
                              }, 
                              "entity": {
                                "name": entityItem.name,
                                "description": entityType + " Activity",
                                "isPrimary": false
                              }
                          })
                          .then(function(results){
                            console.log('created and related activity', results);
                            return results;
                          })
                          .catch(function(err){
                            console.log(err);
                            return err;
                          })
                    }
            })
    }


});

