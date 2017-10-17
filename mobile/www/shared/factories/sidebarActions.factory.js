angular.module('interloop.factory.sidebarActions', [])

.factory('SidebarActions', function(
    $document,
    $http, 
    $rootScope, 
    $uibModal, 
    $q, 
    $log,
    $injector,
    Appuser,
    Activity,
    Logger,
    modalManager,
    RelationshipManager,
    SidebarRouter) {

    var SidebarActions = {
        cloneItem: cloneItem,
        copyShareLink: copyShareLink,
        // createActivity: createActivity,
        createChangeActivity: createChangeActivity,
        // createNote: createNote,
        deleteItem: deleteItem,
        starItem: starItem,
        completeActivity: completeActivity,
        getAddresses: getAddresses,
        getFiles: getFiles,
        getHistory: getHistory,
        getOpenActivities: getOpenActivities,
        getStarred: getStarred,
        getTags: getTags,
        // logActivity: logActivity,
        manageTags: manageTags,
        monitorScroll: monitorScroll,
        relateToWizard: relateToWizard,
        saveData: saveData,
        scrollLeft: scrollLeft,
        scrollRight: scrollRight,
        unArchiveItem: unArchiveItem,
        uploadFiles: uploadFiles,
        starItem: starItem,
        unStarItem: unStarItem,
        wonReason: wonReason,
        lostReason: lostReason

    };

    return SidebarActions;

    ///////////////////////
    // Shared Filters    //
    ///////////////////////



    function getTags(items) {
        var defer = $q.defer();
        //get tags from provided items
        var tags = _.filter(items, {"itemType": "Tag"});
        //resolve the options
        defer.resolve(tags);
        //return promise
        return defer.promise;
    }

    function getAddresses(items) {
        var defer = $q.defer();
        //get tags from provided items
        var addresses = _.get(items, 'addresses', []);
        //resolve the options
        defer.resolve(addresses);
        //return promise
        return defer.promise;
    }


    function getFiles(items) {
        var defer = $q.defer();
        //get tags from provided items
        var files = _.filter(items, {"itemType": 'File'});
        //resolve the options
        defer.resolve(files);
        //return promise
        return defer.promise;
    }

    //NEED TO REFACTOR THIS
    function getOpenActivities(activities) {
        var defer = $q.defer();
        //get tags from provided items
        var openActivities = _.filter(activities, function(o) {
          return _.has(o, 'activity') && o.activity.completed !== true && o.activity.type && o.activity.type.value !== 'Note'  && o.activity.type.value !== 'Status_Change';
        })
        //resolve the options
        defer.resolve(openActivities);
        //return promise
        return defer.promise;
    }

    //NEED TO REFACTOR THIS
    function getHistory(activities) {
        var defer = $q.defer();
        //get tags from provided items
        var history = _.filter(activities, function(o) {
          return _.has(o, 'activity') && o.activity.completed == true && _.isString(o.type)
        });
        //resolve the options
        defer.resolve(history);
        //return promise
        return defer.promise;
    }


    function getStarred(entityItem) {
        //assumes all ids are unique - do i need to check type as well?
        var isStarred = !_.isNil(_.find(_.get($rootScope.activeUser, 'starredLinks', []), ['itemId', entityItem.id]));
        //return whether is starred
        return isStarred;
    }


    ///////////////////////
    //TOP RIGHT FUNCTIONS//
    ///////////////////////


      //starred item
  function starItem(entityType, entityItem) {

    // name
    var name = '';

    if(entityType == 'Contact') {
      name = entityItem.fullName || '';
    } else {
      name = entityItem.name || '';
    }

    //var starred objects
    var starObject = {
       "name": name,
       "itemId": entityItem.id,
       "itemType": entityType
    }

   return Appuser.prototype$__create__starredItems({"id": Appuser.getCurrentId()}, starObject).$promise
    .then(function(response){
      return response;
    })
  }



  //remnoved starred item
  function unStarItem(entityItem) {
      //makes sure all items of this id are removed from list
      return Appuser.prototype$__destroyById__starredItems({"id": Appuser.getCurrentId()}, {"fk": entityItem.id})
      .$promise
      .then(function(response){
        return response;
      }) 
  }

  

  function starItem(entityType, entityItem) {

        // var userId = Appuser.getCurrentId();
        // var followers = [];
        // //check is has followers attribute, if not use array
        // if(_.has(entityItem, 'followers')) {
        //   //set followers equal to task followers
        //   followers = entityItem.followers; 
        // }
        // //then whether to add or remove user id from followers list
        // if(entityItem.starred == false) {
        //     followers.push(userId);
        //     entityItem.starred = true;
        //     Logger.info('Starred Item');
        //   }
        //   else {
        //     entityItem.starred = false;
        //       _.pull(followers, userId);
        // }
        // //update task
        // var entityModel = $injector.get(entityType);
        // entityModel.prototype.$updateAttributes(
        //   { id: entityItem.id }, 
        //   { followers: followers })
        //   .$promise
        //   .then(function(results) {
        //      Logger.log("followers saved");
        //      $rootScope.$broadcast('APPLY_ROW_DATA', {entity: entityItem || null, fields: ['starred']});
        //   })
        //   .catch(function(err){
        //   Logger.error(err.statusText,err.data, err.status);
        // })
    }

    /*
    Clone Item
    */
    function cloneItem(entityType, entityItem, owners) {

      Logger.info('Cloning...');

      var clonedItem = angular.copy(entityItem);
      clonedItem.name = clonedItem.name + '-copy'

      //remove id
      delete clonedItem["id"];

      //updated created / updated info
      var currentUser = _.pick($rootScope.activeUser, ['id', 'fullName']);

      //update basic info
      clonedItem.createdBy = currentUser;
      clonedItem.updatedBy = currentUser;
      clonedItem.updatedOn = moment().format();
      clonedItem.createdOn = moment().format();

      //set owner to whoever is cloning it
      if(entityType == 'Opportunity') {
        clonedItem.owner = _.find(owners, {'id': currentUser.id});
        clonedItem.stage = clonedItem.process.stages[0];
        //remove actiivty 
        clonedItem.activityLinks = [];
        clonedItem.entityLinks = [];
        clonedItem.itemLinks = _.filter(clonedItem.itemLinks, function(o) { return o.itemType == 'Tag'; });
        //won / lost reason
        clonedItem.wonDetails = null;
        clonedItem.wonReason = {};
        clonedItem.lostDetails = null;
        clonedItem.lostReason = {};
        clonedItem.actualClose = null;
        //clear out sales process
        _.forEach(clonedItem.process.stages, function(value, key){
          value.completed = false;
          value.completedDate = null;
          //set all steps as false
          _.forEach(value.steps, function(step, key){
            step.completed = false;
          })
        })
      }

      //create new item
      var entityModel = $injector.get(entityType);
      return entityModel.create(clonedItem)
        .$promise
        .then(function(result) {
          return result;
        })
        .catch(function(err){
          Logger.error('Error Cloning ' + entityType)
          Logger.log("failed to clone - " + err); 
        })
    }

    /*
    Delete Opp - Soft Deletes entityItem
    */
    function deleteItem(entityType, entityItem) {

       var entityModel = $injector.get(entityType);
       return entityModel.deleteById({ id: entityItem.id }).$promise
        .then(function(result) { 
          return result;
        })
        .catch(function(err){
          Logger.error('Error Deleting ' + entityType)
          Logger.log("failed to delete - " + err); 
        })
    };


    /*
    Un-Archive Item
    */
    function unArchiveItem(entityType, entityItem) {

       var entityModel = $injector.get(entityType);
        return entityModel.unarchive(
          { id: entityItem.id })
          .$promise
          .then(function(results) {
             Logger.info(entityType + ' Un-Archived')
             //set entity item to correct data
             entityItem._isDeleted = false;
             entityItem.deletedAt = null;
            
            return result;
          })
          .catch(function(err){
            Logger.error('Error Un-Archiving ' + entityType);
         })
    };


    /*
    Copy Share Link
    */
    function copyShareLink(shareLink) {
      if (!clipboard.supported) {
            Logger.error('Sorry, copy to clipboard is not supported in this browser');
      }
      else {
        clipboard.copyText(shareLink);
        Logger.info('Copied link to Clipboard');
      }
    }



    ///////////////////////
    //    ACTION PANEL   //
    ///////////////////////

    /* 
    Manage Tags Modal
    */ 
    function manageTags(entityType, entityItem) {
      return TagManager.manageTags(entityItem, entityType, entityItem.tags)
      .then(function (tags) {
          //update related items with Tags 
          _.remove(entityItem.items, {"itemType": "Tag"}); 
          _.extend(entityItem.items, tags); //update tags on successful return 

          //update itemLinks
          _.remove(entityItem.itemLinks, {"itemType": "Tag"}); 
          var strippedTags = _.map(tags,function(tag){return _.omit(tag, ['item'])}); 
          _.extend(entityItem.itemLinks, strippedTags);  //add tags to linkItems but remove item detail

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    /*
    Relate Entity Wizard
    */
    function relateToWizard(entityType, entityItem, pickLists) {
      RelationshipManager.relateToWizard(entityItem, entityType, ORG_CONFIG.relateToEntities, pickLists)
    }; 

    /* 
    Upload Files
    */ 
    function uploadFiles(entityType, entityItem, files) {

      var uploadedFiles = {};
   
      _.forEach(files, function(value, key){
          modalManager.openModal('fileUpload', value);
      })
 

    }


    /*
    Create Activity
    */
    function newActivity(entityType, entityItem) {
        modalManager.openModal('newActivity');
    }

    /*
    Create Note
    */
    function newNote(entityType, entityItem) {
        modalManager.openModal('newNote');
    }


    ///////////////////////
    // Manage Activities //
    ///////////////////////

    //TB - TODO may want to move this into Relationship Manager
      function updateActivityLink(entityModel, entityItem, activity) {
          return entityModel.prototype$__get__activities({"id": entityItem.entityId, "filter": {"where":{"activityId": activity.id}}}).$promise
          .then(function(results){
            var activityLink = results[0]; //will be first entry in array 
            return entityModel.prototype$__updateById__activities(
              {"id":  entityItem.entityId, "fk": activityLink.id}, 
              {
                "id": activityLink.id, 
                "activityId": activity.id, 
                "name": activity.name, 
                "type": _.get(activity.type, 'value', {}),
                "completed": activity.completed, 
                "completedDate": activity.completedDate
            }).$promise 
          })  
      }; 


      //update activity and then update activitylinks 
      function completeActivity(activity) {

        // console.log(activity);

        return Activity.updateAttributes({"id": activity.activityId}, {'completed': true, 'completedDate' : moment().format()})
          .$promise
          .then(function(response){
            // console.log(response);

            var updatedActivity = response;
            var updateLinks = [];

            //need to udpate anywhere activity is linked
            angular.forEach(response.entityLinks, function(entityLink){
              var entityModel = $injector.get(entityLink.entityType); 

              updateLinks.push(
                updateActivityLink(entityModel, entityLink, updatedActivity) 
              ); 
            }); 
          
            //run update for each entity 
            $q.all(updateLinks)  
            .then(function(results){
              return updatedActivity; //return completed activity 
            }) 

          })
          .catch(function(err) {
            Logger.error('Error updating ' + entityType);
            Logger.log(err);
          });
      }; 


    ///////////////////////
    //   Monitor Scrol   //
    ///////////////////////

    function scrollRight() {
      var maxScrollLeft = $document[0].getElementById("navTabsScroller").scrollWidth - $document[0].getElementById("navTabsScroller").clientWidth;
      var view = angular.element($document[0].getElementById("navTabsScroller"))
      var currentPosition = view.scrollLeft();

      //scroll it left
      view.animate( { scrollLeft: '+=300' }, 150);

    }

    //scroll left within the tab bar
    function scrollLeft() {
        var view = angular.element($document[0].getElementById("navTabsScroller"))
        var currentPosition = parseInt(view.css("left"));

        //scroll it left
        view.animate( { scrollLeft: '-=300' }, 150);
    }

    //monitor scroll and show indicators
    function monitorScroll() {
        //reset vars for new view
      $rootScope.showScrollRight = true;
      $rootScope.showScrollLeft = false;
      //get dom elements
      var view = angular.element($document[0].getElementById("navTabsScroller"))
      var maxScrollLeft = $document[0].getElementById("navTabsScroller").scrollWidth - $document[0].getElementById("navTabsScroller").clientWidth;
      //bind to scroll
       view.bind('scroll', function() {
          // console.log(view.scrollLeft());

           if(view.scrollLeft() == 0) {
              $rootScope.$apply(function() {
                $rootScope.showScrollLeft = false
              });
           } else {
              $rootScope.$apply(function() {
                $rootScope.showScrollLeft = true
              });
           }

          if(view.scrollLeft() == maxScrollLeft) {
              $rootScope.$apply(function() {
                $rootScope.showScrollRight = false
              });
           } else {
              $rootScope.$apply(function() {
                $rootScope.showScrollRight = true
              });
           }

        });

    }

    ///////////////////////
    //     Win / Lost    //
    ///////////////////////

    /*
    Won Reason Modal
    */
    function wonReason(entityItem, value, oldValue, reasons) {
      modalManager.openModal('wonReason');
    }

    /*
    Lost Reason Modal
    */
    /*
    Won Reason Modal
    */
    function lostReason(entityItem, value, oldValue, reasons) {
      modalManager.openModal('lostReason');
    }

    ///////////////////////
    //   Save Data       //
    ///////////////////////

    function saveData(entityType, entityItem, newValue, noAlert) {

        var entityModel = $injector.get(entityType); 
        //return entityModel.updateAttributes({"id": entityItem.id}, newValue).$promise
        return entityModel.patchAttributes({"id": entityItem.id}, newValue).$promise
        .then(function(response) {
            if(!noAlert) {
              Logger.info(entityType  + ' ' + (Object.keys(newValue)[0] || '') + ' updated');
            }
            return(response); 
        })
        .catch(function(err) {
            Logger.error('Error updating ' + entityType);
            Logger.log(err);
        });
    }; 



    /*
    Create Activity
    */
    function createChangeActivity(name, type, data, entityItem) {

      var newActivity = {};
      newActivity.name = name || null;
      newActivity.type = {"value": type} || null;
      newActivity.data = data || {};
      newActivity.owner = {
        fullName: $rootScope.activeUser.fullName,
        initials: $rootScope.activeUser.initials
      };
      newActivity.completed = true;
      newActivity.completedDate = moment().format();

      //actually create activity
      Activity.create(newActivity).$promise
      .then(function(data) { 

        var activity = data; 
        var activityId = data.id; 
        //create relationships if needed

        entityItem.history.push({"activity": activity});
        //link this activity to this opp
        RelationshipManager.linkActivity(activity.id, entityItem.id, "Opportunity", 
          {
            "activity": {
              "name": activity.name,
                      "type": {"value": activity.type}, 
                      "completed": activity.completed
              
            }, 
            "entity": {
              "name": entityItem.name,
              "description": "Opportunity" + " Activity",
              "isPrimary": false
            }
          })

      }) 
      .catch(function(err){
        Logger.log(err.statusText,err.data, err.status);
      })
    }; 




})