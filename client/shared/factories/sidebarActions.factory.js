angular.module('interloop.factory.sidebarActions', [])

.factory('SidebarActions', function(
    $document,
    $http, 
    $rootScope, 
    $uibModal, 
    $q, 
    $timeout,
    $log,
    $state,
    $injector,
    Appuser,
    Activity,
    Logger,
    clipboard,
    modalManager,
    TagManager,
    gridManager,
    activityCreator,
    RelationshipManager,
    SidebarRouter) {

    var SidebarActions = {
        cloneItem: cloneItem,
        copyShareLink: copyShareLink,
        createActivity: createActivity,
        createChangeActivity: createChangeActivity,
        createNote: createNote,
        createMeeting: createMeeting,
        createTask: createTask,
        deleteItem: deleteItem,
        logCall: logCall,
        // follow: follow,
        completeActivity: completeActivity,
        getAddresses: getAddresses,
        getFiles: getFiles,
        getHistory: getHistory,
        getOpenActivities: getOpenActivities,
        getStarred: getStarred,
        getTags: getTags,
        getLastActivity: getLastActivity,
        getNextActivity: getNextActivity,
        getOverdueActivities: getOverdueActivities, 
        getUpcomingActivities: getUpcomingActivities,
        // logActivity: logActivity,
        manageTags: manageTags,
        removeTag: removeTag,
        monitorScroll: monitorScroll,
        manageRelationships: manageRelationships,
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

    function getTags(entityItem) {
        var allTags = _.filter(entityItem.itemLinks, {"itemType": "Tag"});
        //this retrives the tag links which has valuable information but then also adds the full 
        //tag record included to ensure have all information we need
        _.forEach(allTags, function(tag){
          tag.item = _.find(_.filter(entityItem.items, {"itemType": "Tag"}), ['itemId', tag.itemId])['item'];
        })
        return allTags;
    }

    function getAddresses(items) {
        return _.get(items, 'addresses', []);
    }

    function getFiles(items) {
        var files = _.filter(items, {"itemType": 'Attachment'});

        //turns file size into number needed for kb fileter
        // _.forEach(files, function(value, key){
        //   value.item.size = Number(value.item.size) ? Number(value.size) : 0;
        // })

        //return files
        return  files;
    }


    function getLastActivity(activities) {
      return _.sortBy(_.filter(activities, ['completed', true]), ['completedDate'])[0] || null;
    }


    function getNextActivity(activities) {
      return _.sortBy(_.filter(activities, ['completed', false]), ['dueDate'])[0] || null;
    }


    function getOverdueActivities(activities) {
      return _.filter(_.filter(activities, ['completed', false]), function(o){
        return o.dueDate < moment().endOf('day').format();
      });
    }

    function getUpcomingActivities(activities) {
      return _.filter(_.filter(activities, ['completed', false]), function(o){
        return o.dueDate > moment().endOf('day').format();
      });
    }

    function getOpenActivities(activities) {
        return _.filter(activities, function(o) {
          return _.has(o, 'activity') && o.activity.completed !== true && o.activity.type && o.activity.type.value !== 'Note' && o.activity.type.value !== 'Meeting' && o.activity.type.value !== 'Status_Change';
        })
    }

    function getHistory(activities) {
        return _.filter(activities, function(o) {
          return o.completed == true
        });
    }

    function getStarred(entityItem) {
        var starredItems = _.get($rootScope.activeUser, 'starredLinks', []);
        // console.log(starredItems);
        //assumes all ids are unique - do i need to check type as well?
        var isStarred = !_.isNil(_.find(starredItems, ['itemId', entityItem.id]));
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


   return Appuser.prototype$__updateById__starredItems({"id": Appuser.getCurrentId()}, {"fk": entityItem.id}).$promise
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

  

  // function follow(entityType, entityItem) {

  //       var userId = Appuser.getCurrentId();
  //       var followers = [];
  //       //check is has followers attribute, if not use array
  //       if(_.has(entityItem, 'followers')) {
  //         //set followers equal to task followers
  //         followers = entityItem.followers; 
  //       }
  //       //then whether to add or remove user id from followers list
  //       if(entityItem.starred == false) {
  //           followers.push(userId);
  //           entityItem.starred = true;
  //           Logger.info('entityItem followed');
  //         }
  //         else {
  //           entityItem.starred = false;
  //             _.pull(followers, userId);
  //       }
  //       //update task
  //       var entityModel = $injector.get(entityType);
  //       entityModel.prototype.$updateAttributes(
  //         { id: entityItem.id }, 
  //         { followers: followers })
  //         .$promise
  //         .then(function(results) {
  //            Logger.log("followers saved");
  //            $rootScope.$broadcast('APPLY_ROW_DATA', {entity: entityItem || null, fields: ['starred']});
  //         })
  //         .catch(function(err){
  //         Logger.error(err.statusText,err.data, err.status);
  //       })
  //   }

    /*
    Clone Item
    */
    function cloneItem(entityType, entityItem, owners) {

      Logger.info('Cloning Record...');

      var clonedItem = angular.copy(entityItem);
      clonedItem.name = clonedItem.name + '-copy'

      //remove id
      delete clonedItem["id"];

      //updated created / updated info
      var currentUser = _.pick($rootScope.activeUser, ['id', 'firstName', 'lastName']);

      //update basic info
      clonedItem.createdBy = currentUser;
      clonedItem.updatedBy = currentUser;
      clonedItem.updatedOn = moment().format();
      clonedItem.createdOn = moment().format();

      //set owner to whoever is cloning it
      if(entityType == 'Opportunity') {
        // clonedItem.owner = _.find(owners, {'id': currentUser.id});
        // clonedItem.stage = clonedItem.process.stages[0];
        // //remove actiivty 
        // clonedItem.activityLinks = [];
        // clonedItem.entityLinks = [];
        // clonedItem.itemLinks = _.filter(clonedItem.itemLinks, function(o) { return o.itemType == 'Tag'; });
        // //won / lost reason
        // clonedItem.wonDetails = null;
        // clonedItem.wonReason = {};
        // clonedItem.lostDetails = null;
        // clonedItem.lostReason = {};
        // clonedItem.actualClose = null;
        // //clear out sales process
        // _.forEach(clonedItem.process.stages, function(value, key){
        //   value.completed = false;
        //   value.completedDate = null;
        //   //set all steps as false
        //   _.forEach(value.steps, function(step, key){
        //     step.completed = false;
        //   })
        // })
      }

      //create new item
      var entityModel = $injector.get(entityType);
      return entityModel.create(clonedItem)
        .$promise
        .then(function(result) {
          Logger.info('Record Cloned', clonedItem.name);

          //pass current state into sidebar history stack
          var currentState = {'entity': entityType.toLowerCase(), 'id': entityItem.id }

          //refresh grid
          gridManager.refreshView();

          //go to new record
          SidebarRouter.goTo(currentState, entityType.toLowerCase(), result.id)
          
          //do i need to return result;
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
       entityModel.deleteById({ id: entityItem.id }).$promise
      .then(function() { 
        Logger.info(entityType + ' Archived', 'Contact admin to retrieve')
          //remove deleted row from the grid without refreshViewing
        gridManager.refreshView()
        //shows deleted
        entityItem._isDeleted = true;
        // // go back - or close sidebar (Close is handled by sidebar router)
        // SidebarRouter.goBack();

        //creates activity deleted
        var activityDetails = {
          title: 'Deleted ' + entityType,
          data: {
            deleted: true
          }
        }
        activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)
      })
      .catch(function(err){
        Logger.error('Error Deleting ' + entityType)
        Logger.log("failed to delete - ", err); 
      })
    };


    /*
    Un-Archive Item
    */
    function unArchiveItem(entityType, entityItem) {

       var entityModel = $injector.get(entityType);
        entityModel.unarchive(
          { id: entityItem.id })
          .$promise
          .then(function(results) {
             Logger.info(entityType + ' Un-Archived')
             //set entity item to correct data
             entityItem._isDeleted = false;
             entityItem.deletedAt = null;
            //remove deleted row from the grid without refreshViewing
             gridManager.refreshView();

              //creates activity deleted
              var activityDetails = {
                title: 'Un-Archived ' + entityType,
                data: {
                  deleted: false
                }
              }
              activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)
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

      //resolved information
      var resolveData = {
        entity: entityType,
        selectedItems: [ entityItem ]
      };


      // var resolvedData = {
      //   entity: entityType
      // }

      var addTagModal = modalManager.openModal('bulkTag', resolveData);

      //add tag modal
      addTagModal.result.then(function(results){
        // console.log(results);

        //push in plain objects
        _.forEach(results, function(value){
              //append information so tooltips work well
              value.item = value.item || {};
              value['item']['createdBy'] = value['item']['createdBy'] || {
                firstName: $rootScope.activeUser.firstName,
                lastName: $rootScope.activeUser.lastName
              };
              //created on
              value['item'].createdOn = value['item'].createdOn || moment().format();

              entityItem.items.push(value);
              entityItem.itemLinks.push(value);
        })

        // refreshes tags in view
        $timeout(function(){
             entityItem.tags = getTags(entityItem);
        }, 0)
        // $scope.data.thisOpp.tags = SidebarActions.getTags($scope.data.thisOpp.items);
      })

      // return TagManager.manageTags(entityItem, entityType, entityItem.tags)
      // .then(function (tags) {
      //     //update related items with Tags 
      //     _.remove(entityItem.items, {"itemType": "Tag"}); 
      //     _.extend(entityItem.items, tags); //update tags on successful return 

      //     //update itemLinks
      //     _.remove(entityItem.itemLinks, {"itemType": "Tag"}); 
      //     var strippedTags = _.map(tags,function(tag){return _.omit(tag, ['item'])}); 
      //     _.extend(entityItem.itemLinks, strippedTags);  //add tags to linkItems but remove item detail

      //   }, function () {
      //       $log.info('Modal dismissed at: ' + new Date());
      //   });
    }


    function removeTag(entityType, entityItem, tagItem){
          return RelationshipManager.unlinkItem(entityItem.id, tagItem.id, entityType, "Tag")
          .then(function(results){
            _.remove(entityItem.items, function(object){ 
              // console.log('remove object', object);
              return object.id === tagItem.id }); 
            _.remove(entityItem.itemLinks, function(object){ return object.id === tagItem.id }); 

              // refreshes tags in view
            $timeout(function(){
                 entityItem.tags = getTags(entityItem);
            }, 0)
                  
            //let user know
            Logger.info('Tag Removed');

            //creates activity deleted
            var activityDetails = {
                title: 'Removed Tag',
                data: {
                  tag: tagItem
                }
              }
              activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)
          })
          .catch(function(err){
            Logger.error('Error Removing Tag', "Please Try Again In A Few Moments")
          })
    }

    /*
    Relate Entity Wizard
    */
    function manageRelationships(entityType, entityItem) {
      var resolvedData = {
        entityType: entityType,
        thisRecord: entityItem
      }
      
      //prevents double modal - do nothing if already set to true 
      var relateEntityModal = modalManager.openModal('addRelated', resolvedData);

      relateEntityModal.result.then(function(results){
        //do we need to do something here
        console.log('relate modal closed');

        Logger.info('Adding Relationships...')


        //creates activity deleted
        var activityDetails = {
            title: 'Added Relationship',
            data: {
              relationships: results
            }
          }
          activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)

      }, function(){
        //ignore
      })
    }; 

    /* 
    Upload Files
    */ 
    function uploadFiles(entityType, entityItem, files) {

      var uploadedFiles = {};
   
      _.forEach(files, function(value, key){
        var resolvedData = {
          entityType: entityType,
          entityItem: entityItem,
          file: value
        }

          var thisModal = modalManager.openModal('fileUpload', resolvedData);

          thisModal.result.then(function(results){

            // Logger.info('Adding Relationships...')
            //moved relationship stuff to file upload controller

              console.log('after modal results', results);
 
              var fileActivity = {};
              fileActivity.name = "uploaded files";
              fileActivity.type = "file";
              fileActivity.files = files;
              fileActivity.completed = true;
              fileActivity.completedDate = moment().format();
              fileActivity.createdBy = {
                firstName: $rootScope.activeUser.fullName,
                initials: $rootScope.activeUser.initials
              };


              //creates activity deleted
              var activityDetails = {
                  title: 'Added Files',
                  data: {
                    files: files
                  }
                }
              activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)

          })
      })
 

    }

        /*
    Create Activity
    */
    function createMeeting(entityType, entityItem) {
        modalManager.openModal('newMeeting');
    }

    /*
    Create Activity
    */
    function createTask(entityType, entityItem) {
        modalManager.openModal('newTask');
    }

    /*
    Log Call
    */
    function logCall(entityType, entityItem) {
        modalManager.openModal('logCall');
    }

    /*
    Create Activity
    */
    function createActivity(entityType, entityItem) {
        modalManager.openModal('newActivity');
    }

    /*
    Create Note
    */
    function createNote(entityType, entityItem) {
         var resolvedData = {
          relatedEntities: [{
            type: entityType,
            data: entityItem
          }]
         }

        var newNoteModal = modalManager.openModal('newNote', resolvedData);

        //
        newNoteModal.result.then(function(results){

            console.log('after modal results', results);
   
        }, function(){
          //ignore
        })
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

        console.log('save data');

        var entityModel = $injector.get(entityType); 



        //check for closed-won / closed-lost
        if(entityType == 'Opportunity' && _.keys(newValue)[0] == 'status') {

          if(newValue['value'] == 'closedWon') {
            console.log('changed to won')
          } else if(newValue['value'] == 'closedLost'){
            console.log('changed to lost')
          }
        }


        //return entityModel.updateAttributes({"id": entityItem.id}, newValue).$promise
        return entityModel.prototype$patchAttributes({"id": entityItem.id}, newValue).$promise
        .then(function(response) {
            if(!noAlert) {
              Logger.info(entityType  + ' ' + (Object.keys(newValue)[0] || '') + ' updated');
            }

             var activityDetails = {
                  title: "Updated " + entityType,
                  data: newValue
                }
              activityCreator.createActivity('changelog', activityDetails, true, entityItem, entityType)
                .then(function(results){
                    return(response); 
                })

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