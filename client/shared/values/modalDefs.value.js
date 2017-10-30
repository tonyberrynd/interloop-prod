angular.module('interloop.value.modalDefs', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//Contact Fields
.value("modalDefs", {

    userOnboarding: {
        templateUrl: 'onboarding/user/user-onboarding.tpl.html',
        controller: 'userOnboardingCtrl',
        size: 'lg',
        animation: false,
        windowClass: 'onboarding-modal',
        ariaLabelledBy: 'Onboarding',
        ariaDescribedBy: 'Onboarding'
    },

    mediaPicker: {
        templateUrl: 'shared/modals/mediaPicker/mediaPicker.tpl.html',
        controller: 'mediaPickerCtrl',
        size: 'lg',
        windowClass: 'media-picker',
        ariaLabelledBy: 'Media Picker',
        ariaDescribedBy: 'Media Picker'
    },

    inviteUsers: {
        templateUrl: 'shared/modals/inviteUsers/inviteUsers.tpl.html',
        controller: 'inviteUsersCtrl',
        size: 'lg',
        ariaLabelledBy: 'Invite Users',
        ariaDescribedBy: 'Invite Users'
    },

    connectIcloud: {
        templateUrl: 'shared/modals/connectIcloud/connectIcloud.tpl.html',
        controller: 'connectIcloudCtrl',
        size: 'md',
        ariaLabelledBy: 'Import Contacts',
        ariaDescribedBy: 'Import Contacts'
    },

    addPipeline: {
        templateUrl: 'shared/modals/addPipeline/addPipeline.tpl.html',
        controller: 'addPipelineCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Pipeline',
        ariaDescribedBy: 'Add Pipeline'
    },

    addOwners: {
        templateUrl: 'shared/modals/addOwners/addOwners2.tpl.html',
        controller: 'addOwnersCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Owners',
        ariaDescribedBy: 'Add Owners'
    },

    addOwner: {
        templateUrl: 'shared/modals/addOwner/addOwner.tpl.html',
        controller: 'addOwnerCtrl',
        size: 'lg',
        ariaLabelledBy: 'Add Owner',
        ariaDescribedBy: 'Add Owner'
    },

    addTag: {
        templateUrl: 'shared/modals/addTag/addTag.tpl.html',
        controller: 'addTagCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Tag',
        ariaDescribedBy: 'Add Tag'
    },

    addProduct: {
        templateUrl: 'shared/modals/addProduct/addProduct.tpl.html',
        controller: 'addProductCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Product',
        ariaDescribedBy: 'Add Product'
    },


    addProcess: {
        templateUrl: 'shared/modals/addProcess/addProcess.tpl.html',
        controller: 'addProcessCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Process',
        ariaDescribedBy: 'Add Process'
    },

    addGoal: {
        templateUrl: 'shared/modals/addGoal/addGoal.tpl.html',
        controller: 'addGoalCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Goal',
        ariaDescribedBy: 'Add Goal'
    },

    assignRole: {
        templateUrl: 'shared/modals/assignRole/assignRole.tpl.html',
        controller: 'assignRoleCtrl',
        size: 'md',
        ariaLabelledBy: 'Assign Role',
        ariaDescribedBy: 'Assign Role'
    },

    addRole: {
        templateUrl: 'shared/modals/addRole/addRole2.tpl.html',
        controller: 'addRoleCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Role',
        ariaDescribedBy: 'Add Role'
    },

    addRelated: {
        templateUrl: 'shared/modals/addRelated/addRelated.tpl.html',
        controller: 'addRelatedCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Related Record',
        ariaDescribedBy: 'Add Related Record'
    },

    addStatus: {
        templateUrl: 'shared/modals/addStatus/addStatus.tpl.html',
        controller: 'addStatusCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Status',
        ariaDescribedBy: 'Add Status'
    },

    addActivityType: {
        templateUrl: 'shared/modals/addActivityType/addActivityType.tpl.html',
        controller: 'addActivityTypeCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Activity Type',
        ariaDescribedBy: 'Add Activity Type'
    },

    addForecastCategory: {
        templateUrl: 'shared/modals/addForecastCategory/addForecastCategory.tpl.html',
        controller: 'addForecastCategoryCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Forecast Category',
        ariaDescribedBy: 'Add Forecast Category'
    },


    shareWith: {
        templateUrl: 'shared/modals/shareWith/shareWith.tpl.html',
        controller: 'shareWithCtrl',
        size: 'md',
        ariaLabelledBy: 'Share Record With',
        ariaDescribedBy: 'Share Record With'
    },

    //submit forecast
    submitForecast: {
        templateUrl: 'shared/modals/submitForecast/submitForecast.tpl.html',
        controller: 'submitForecastCtrl',
        size: 'md',
        ariaLabelledBy: 'Submit Forecast',
        ariaDescribedBy: 'Submit Forecast'
    },

    customActivity: {
        templateUrl: 'shared/modals/customActivity/customActivity.tpl.html',
        controller: 'customActivityCtrl',
        size: 'md',
        ariaLabelledBy: 'New Activity',
        ariaDescribedBy: 'Create a new activity'
    },

    //new activity modal
    newActivity: {
        templateUrl: 'shared/modals/newActivity/newActivity.tpl.html',
        controller: 'newActivityCtrl',
        size: 'md',
        ariaLabelledBy: 'New Activity',
        ariaDescribedBy: 'Create a new activity'
    },

    //new meeting
    newMeeting: {
        templateUrl: 'shared/modals/newMeeting/newMeeting.tpl.html',
        controller: 'newMeetingCtrl',
        size: 'md',
        ariaLabelledBy: 'New Meeting',
        ariaDescribedBy: 'Create a new Meeting'
    },

    //log call
    logCall: {
        templateUrl: 'shared/modals/logCall/logCall.tpl.html',
        controller: 'logCallCtrl',
        size: 'md',
        ariaLabelledBy: 'Log Call',
        ariaDescribedBy: 'Log Call'
    },



    //new opportunity modal
    newOpportunity: {
        templateUrl: 'shared/modals/newOpportunity/newOpportunity.tpl.html',
        controller: 'newOpportunityCtrl',
        size: 'md',
        windowClass: 'static-modal',
        ariaLabelledBy: 'New Opportunity',
        ariaDescribedBy: 'Create a new opportunity'
    },

    //new contact modal
    newContact: {
        templateUrl: 'shared/modals/newContact/newContact.tpl.html',
        controller: 'newContactCtrl',
        size: 'md',
        windowClass: 'static-modal',
        ariaLabelledBy: 'New Contact',
        ariaDescribedBy: 'Create a new contact'
    },

    //new company modal
    newCompany: {
        templateUrl: 'shared/modals/newCompany/newCompany.tpl.html',
        controller: 'newCompanyCtrl',
        size: 'md',
        windowClass: 'static-modal',
        ariaLabelledBy: 'New Company',
        ariaDescribedBy: 'Create a new company'
    },

    //new note modal
    newNote: {
        templateUrl: 'shared/modals/newNote/newNote.tpl.html',
        controller: 'newNoteCtrl',
        size: 'md',
        ariaLabelledBy: 'New Note',
        ariaDescribedBy: 'Create a new note'
    },

     //new task modal
    newTask: {
        templateUrl: 'shared/modals/newTask/newTask.tpl.html',
        controller: 'newTaskCtrl',
        size: 'md',
        ariaLabelledBy: 'New Task',
        ariaDescribedBy: 'Create a new Task'
    },

    // //new opportunity modal
    // newProspect: {
    //     templateUrl: 'shared/modals/newProspect/newProspect.tpl.html',
    //     controller: 'newProspectCtrl',
    //     size: 'lg',
    //     windowClass: 'static-modal',
    //     ariaLabelledBy: 'New Prospect',
    //     ariaDescribedBy: 'Create a new prospect'
    // },

    //new note modal
    wonReason: {
        templateUrl: 'shared/modals/wonResaon/wonResaon.tpl.html',
        controller: 'wonResaonCtrl',
        size: 'md',
        ariaLabelledBy: 'Won Reason',
        ariaDescribedBy: 'Supply a won reason'
    },

        //new note modal
    lostReason: {
        templateUrl: 'shared/modals/lostReason/lostReason.tpl.html',
        controller: 'lostReasonCtrl',
        size: 'md',
        ariaLabelledBy: 'Lost Reason',
        ariaDescribedBy: 'Supply a lost reason'
    },

    createView: {
        templateUrl: 'shared/modals/createView/createView.tpl.html',
        controller: 'createViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Create View',
        ariaDescribedBy: 'Create a new view'
    },

    editRole: {
        templateUrl: 'shared/modals/editRole/editRole.tpl.html',
        controller: 'editRoleCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Role',
        ariaDescribedBy: 'Edit Role'
    },

    editView: {
        templateUrl: 'shared/modals/editView/editView.tpl.html',
        controller: 'editViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit View',
        ariaDescribedBy: 'Edit an existing view'
    },

    editSystemView: {
        templateUrl: 'shared/modals/editSystemView/editSystemView.tpl.html',
        controller: 'editSystemViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit System View',
        ariaDescribedBy: 'Edit System View'
    },

    editUser: {
        templateUrl: 'shared/modals/editUser/editUser.tpl.html',
        controller: 'editUserProfileCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Profile',
        ariaDescribedBy: 'Edit Profile'
    },

    editReason: {
        templateUrl: 'shared/modals/editReason/editReason.tpl.html',
        controller: 'editReasonCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Won / Loss Reason',
        ariaDescribedBy: 'Edit Won / Loss Reason'
    },

    deleteView: {
        templateUrl: 'shared/modals/deleteView/deleteView.tpl.html',
        controller: 'deleteViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Delete View',
        ariaDescribedBy: 'Delete an existing view'
    },

    bulkAssign: {
        templateUrl: 'shared/modals/bulkAssign/bulkAssign.tpl.html',
        controller: 'bulkAssignCtrl',
        size: 'md',
        ariaLabelledBy: 'Bulk Assign',
        ariaDescribedBy: 'Bulk Assign Records'
    },

    bulkDelete: {
        templateUrl: 'shared/modals/bulkDelete/bulkDelete.tpl.html',
        controller: 'bulkDeleteCtrl',
        size: 'md',
        ariaLabelledBy: 'Bulk Delete',
        ariaDescribedBy: 'Bulk Delete Records'
    },

    bulkEdit: {
        templateUrl: 'shared/modals/bulkEdit/bulkEdit.tpl.html',
        controller: 'bulkEditCtrl',
        size: 'md',
        ariaLabelledBy: 'Bulk Edit',
        ariaDescribedBy: 'Bulk Edit Records'
    },

    bulkTag: {
        templateUrl: 'shared/modals/bulkTag/bulkTag.tpl.html',
        controller: 'bulkTagCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Tags',
        ariaDescribedBy: 'Add Tags'
    },

    export: {
        templateUrl: 'shared/modals/export/export.tpl.html',
        controller: 'exportCtrl',
        size: 'lg',
        ariaLabelledBy: 'Export',
        ariaDescribedBy: 'Export'
    },

    exportData: {
        templateUrl: 'shared/modals/exportData/exportData.tpl.html',
        controller: 'exportDataCtrl',
        size: 'md',
        ariaLabelledBy: 'Export Data',
        ariaDescribedBy: 'Export Records'
    },

    exportView: {
        templateUrl: 'shared/modals/exportView/exportView.tpl.html',
        controller: 'exportViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Export View',
        ariaDescribedBy: 'Export View'
    },

    importData: {
        templateUrl: 'shared/modals/importData/importData.tpl.html',
        controller: 'importDataCtrl',
        size: 'lg',
        ariaLabelledBy: 'Import Data',
        ariaDescribedBy: 'Import Records'
    },

    fileUpload: {
        templateUrl: 'shared/modals/fileUpload/fileUpload.tpl.html',
        controller: 'fileUploadCtrl',
        size: 'md',
        ariaLabelledBy: 'Upload File',
        ariaDescribedBy: 'Upload a File'
    },

    manageTags: {
        templateUrl: 'shared/modals/manageTags/manageTags.tpl.html',
        controller: 'manageTagsCtrl',
        size: 'md',
        ariaLabelledBy: 'Manage Tags',
        ariaDescribedBy: 'Manage Tags'
    },

    manageRelationships: {
        templateUrl: 'shared/modals/manageRelationships/manageRelationships.tpl.html',
        controller: 'manageRelationshipsCtrl',
        size: 'lg',
        ariaLabelledBy: 'Manage Relationships',
        ariaDescribedBy: 'Manage Relationships'
    },

    invoiceDetails: {
        templateUrl: 'shared/modals/invoiceDetails/invoiceDetails.tpl.html',
        controller: null,
        size: 'md',
        ariaLabelledBy: 'Invoice Preferences',
        ariaDescribedBy: 'Invoice Preferences'
    },

    warning: {
        templateUrl: 'shared/modals/warning/warning.tpl.html',
        controller: 'warningCtrl',
        size: 'md',
        ariaLabelledBy: 'Confirm Action',
        ariaDescribedBy: 'Confirm Action'
    },

    confirm: {
        templateUrl: 'shared/modals/confirm/confirm.tpl.html',
        controller: 'confirmCtrl',
        size: 'md',
        ariaLabelledBy: 'Confirm Action',
        ariaDescribedBy: 'Confirm Action'
    },

    editField: {
        templateUrl: 'shared/modals/editField/editField.tpl.html',
        controller: 'editFieldCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Field',
        ariaDescribedBy: 'Edit Field'
    },

    editStatus: {
        templateUrl: 'shared/modals/editStatus/editStatus.tpl.html',
        controller: 'editStatusCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Status',
        ariaDescribedBy: 'Edit Status'
    },


    newCustomField: {
        templateUrl: 'shared/modals/newCustomField/newCustomField.tpl.html',
        controller: 'newCustomFieldCtrl',
        size: 'md',
        ariaLabelledBy: 'New Custom Field',
        ariaDescribedBy: 'Create a new Custom Field'
    },

    editForecastCategory: {
        templateUrl: 'shared/modals/editForecastCategory/editForecastCategory.tpl.html',
        controller: 'editForecastCategoryCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Forecast Category',
        ariaDescribedBy: 'Edit Forecast Category'
    },

    editActivityType: {
        templateUrl: 'shared/modals/editActivityType/editActivityType.tpl.html',
        controller: 'editActivityTypeCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Activity Type',
        ariaDescribedBy: 'Edit Activity Type'
    },

    editCustomField: {
        templateUrl: 'shared/modals/editCustomField/editCustomField.tpl.html',
        controller: 'editCustomFieldCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Custom Field',
        ariaDescribedBy: 'Edit Custom Field'
    },

    editFormula: {
        templateUrl: 'shared/modals/editFormula/editFormula.tpl.html',
        controller: 'editFormulaCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Formula',
        ariaDescribedBy: 'Edit Formula'
    },

    editProduct: {
        templateUrl: 'shared/modals/editProduct/editProduct.tpl.html',
        controller: 'editProductCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Product',
        ariaDescribedBy: 'Edit Product'
    },

    newTeam: {
        templateUrl: 'shared/modals/newTeam/newTeam.tpl.html',
        controller: 'newTeamCtrl',
        size: 'md',
        ariaLabelledBy: 'New Team',
        ariaDescribedBy: 'Create a new Team'
    },

    editTeam: {
        templateUrl: 'shared/modals/editTeam/editTeam.tpl.html',
        controller: 'editTeamCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Team Details',
        ariaDescribedBy: 'Edit Team Details'
    },

    paymentMethod: {
        templateUrl: 'shared/modals/paymentMethod/paymentMethod.tpl.html',
        controller: 'paymentMethodCtrl',
        windowClass: 'update-payment',
        backdropClass: 'update-payment-method',
        size: 'lg',
        ariaLabelledBy: 'Update Payment Method',
        ariaDescribedBy: 'Update Payment Method'
    },

    logDetails: {
        templateUrl: 'shared/modals/logDetails/logDetails.tpl.html',
        controller: 'logDetailsCtrl',
        size: 'lg',
        ariaLabelledBy: 'Audit Log Details',
        ariaDescribedBy: 'Audit Log Details'
    },

    addAddress: {
        templateUrl: 'shared/modals/addAddress/addAddress.tpl.html',
        controller: 'addAddressCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Address',
        ariaDescribedBy: 'Add Address'
    },

    editAddress: {
        templateUrl: 'shared/modals/editAddress/editAddress.tpl.html',
        controller: 'editAddressCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit Address',
        ariaDescribedBy: 'Edit Address'
    },

    addTeamMembers: {
        templateUrl: 'shared/modals/addTeamMember/addTeamMember.tpl.html',
        controller: 'addTeamMemberCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Team Member',
        ariaDescribedBy: 'Add Team Member'
    },

    addReason: {
        templateUrl: 'shared/modals/addReason/addReason.tpl.html',
        controller: 'addReasonCtrl',
        size: 'md',
        ariaLabelledBy: 'Add Won / Loss Reason',
        ariaDescribedBy: 'Add Won / Loss Reason'
    },

    newSystemView: {
        templateUrl: 'shared/modals/newSystemView/newSystemView.tpl.html',
        controller: 'newSystemViewCtrl',
        size: 'md',
        ariaLabelledBy: 'New System View',
        ariaDescribedBy: 'New System View'
    }

});    

