angular.module('interloop.value.modalDefs', [])

// Basic Fields & Types - Used to create forms & grid defs
//---------------------------------------------------

//Contact Fields
.value("modalDefs", {

    onboarding: {
        templateUrl: 'shared/modals/onboarding/onboarding.tpl.html',
        controller: null,
        size: 'lg',
        animation: false,
        windowClass: 'onboarding-modal',
        ariaLabelledBy: 'Onboarding',
        ariaDescribedBy: 'Onboarding'
    },

    inviteUsers: {
        templateUrl: 'shared/modals/inviteUsers/inviteUsers.tpl.html',
        controller: 'inviteUsersCtrl',
        size: 'lg',
        ariaLabelledBy: 'Invite Users',
        ariaDescribedBy: 'Invite Users'
    },

    //new activity modal
    newActivity: {
        templateUrl: 'shared/modals/newActivity/newActivity.tpl.html',
        controller: 'newActivityCtrl',
        size: 'md',
        ariaLabelledBy: 'New Activity',
        ariaDescribedBy: 'Create a new activity'
    },

    //new note modal
    newNote: {
        templateUrl: 'shared/modals/newNote/newNote.tpl.html',
        controller: 'newNoteCtrl',
        size: 'md',
        ariaLabelledBy: 'New Note',
        ariaDescribedBy: 'Create a new note'
    },

    //new opportunity modal
    newOpportunity: {
        templateUrl: 'shared/modals/newOpportunity/newOpportunity.tpl.html',
        controller: 'newOpportunityCtrl',
        size: 'md',
        ariaLabelledBy: 'New Opportunity',
        ariaDescribedBy: 'Create a new opportunity'
    },

    //new contact modal
    newContact: {
        templateUrl: 'shared/modals/newContact/newContact.tpl.html',
        controller: 'newContactCtrl',
        size: 'md',
        ariaLabelledBy: 'New Contact',
        ariaDescribedBy: 'Create a new contact'
    },

    //new company modal
    newCompany: {
        templateUrl: 'shared/modals/newCompany/newCompany.tpl.html',
        controller: 'newCompanyCtrl',
        size: 'md',
        ariaLabelledBy: 'New Company',
        ariaDescribedBy: 'Create a new company'
    },

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

    editView: {
        templateUrl: 'shared/modals/editView/editView.tpl.html',
        controller: 'editViewCtrl',
        size: 'md',
        ariaLabelledBy: 'Edit View',
        ariaDescribedBy: 'Edit an existing view'
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

    exportData: {
        templateUrl: 'shared/modals/exportData/exportData.tpl.html',
        controller: 'exportDataCtrl',
        size: 'md',
        ariaLabelledBy: 'Export Data',
        ariaDescribedBy: 'Export Records'
    },

    importData: {
        templateUrl: 'shared/modals/importData/importData.tpl.html',
        controller: 'importDataCtrl',
        size: 'md',
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


    invoiceDetails: {
        templateUrl: 'shared/modals/invoiceDetails/invoiceDetails.tpl.html',
        controller: null,
        size: 'md',
        ariaLabelledBy: 'Invoice Preferences',
        ariaDescribedBy: 'Invoice Preferences'
    },


    confirm: {
        templateUrl: 'shared/modals/confirm/confirm.tpl.html',
        controller: 'confirmCtrl',
        size: 'sm',
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

});    

