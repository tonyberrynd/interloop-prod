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
    function createActivity(type, changelogType, activityDetails, completed, entityItem, entityType) {

          var thisActivity = activityDetails || {};
              thisActivity.type = type || 'activity';
              thisActivity.changelogType = changelogType || null;
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
                    .then(function(createdActivity) { 
                     //real time history push
                     if(entityItem) { 
                        //link this activity to this opp
                        return RelationshipManager.linkActivity(createdActivity.id, entityItem.id, entityType, 
                            {
                              "activity": {
                                "name": createdActivity.name || createdActivity.title,
                                "type": type, 
                                "completed": createdActivity.completed
                                
                              }, 
                              "entity": {
                                "name": entityItem.name,
                                "description": entityType + " Activity",
                                "isPrimary": false
                              }
                          })
                          .then(function(results){
                            console.log('created and related activity', results);
                            //push into entity item in real time

                            var doubleLayerActivity = {
                                activityId: createdActivity.id,
                                type: 'changelog',
                                changelogType: createdActivity.changelogType || null,
                                completed: createdActivity.completed,
                                completedDate: createdActivity.completedDate,
                                createdBy: createdActivity.createdBy,
                                id: createdActivity.id,
                                updatedOn: createdActivity.updatedOn,
                                activity: createdActivity,
                              }

                            //async so need to provide in an event based way - TODO look at changing
                            $rootScope.$broadcast("HISTORY_CHANGED", {"id": entityItem.id, "activity": doubleLayerActivity})
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

