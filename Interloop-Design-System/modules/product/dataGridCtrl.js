/* ==========================================================================
   Starter Controller Setup
   ========================================================================== */

angular.module('coil.datagridCtrl', [])
//declare dependencies
.controller('datagridCtrl', function(
	$scope,
  $log, 
  $q,
  $timeout) {

// BINDABLES
//===========================================
	//data
	//----------------------
	$scope.data = {};

var gridDiv;

var countries = [
    {country: "Ireland", continent: "Europe", language: "English"},
    {country: "Spain", continent: "Europe", language: "Spanish"},
    {country: "United Kingdom", continent: "Europe", language: "English"},
    {country: "France", continent: "Europe", language: "French"},
    {country: "Germany", continent: "Europe", language: "(other)"},
    {country: "Sweden", continent: "Europe", language: "(other)"},
    {country: "Norway", continent: "Europe", language: "(other)"},
    {country: "Italy", continent: "Europe", language: "(other)"},
    {country: "Greece", continent: "Europe", language: "(other)"},
    {country: "Iceland", continent: "Europe", language: "(other)"},
    {country: "Portugal", continent: "Europe", language: "Portuguese"},
    {country: "Malta", continent: "Europe", language: "(other)"},
    {country: "Brazil", continent: "South America", language: "Portuguese"},
    {country: "Argentina", continent: "South America", language: "Spanish"},
    {country: "Colombia", continent: "South America", language: "Spanish"},
    {country: "Peru", continent: "South America", language: "Spanish"},
    {country: "Venezuela", continent: "South America", language: "Spanish"},
    {country: "Uruguay", continent: "South America", language: "Spanish"}
];

var games = ["Chess", "Cross and Circle", "Daldøs", "Downfall", "DVONN", "Fanorona", "Game of the Generals", "Ghosts",
    "Abalone", "Agon", "Backgammon", "Battleship", "Blockade", "Blood Bowl", "Bul", "Camelot", "Checkers",
    "Go", "Gipf", "Guess Who?", "Hare and Hounds", "Hex", "Hijara", "Isola", "Janggi (Korean Chess)", "Le Jeu de la Guerre",
    "Patolli", "Plateau", "PÜNCT", "Rithmomachy", "Sáhkku", "Senet", "Shogi", "Space Hulk", "Stratego", "Sugoroku",
    "Tâb", "Tablut", "Tantrix", "Wari", "Xiangqi (Chinese chess)", "YINSH", "ZÈRTZ", "Kalah", "Kamisado", "Liu po",
    "Lost Cities", "Mad Gab", "Master Mind", "Nine Men's Morris", "Obsession", "Othello"
];

var firstNames = ["Sophie", "Isabelle", "Emily", "Olivia"];
var lastNames = ["Beckham", "Black", "Braxton", "Brennan"];


$scope.data.gridOptions = {
    headerHeight:36,
    rowHeight: 42,
    rowSelection: "multiple",
    defaultColDef: {
        // make every column editable
        editable: false,
        cellRenderer: function(params){
          return '<span class="cell-wrapper">' + getParamValue(params) + '</span>'
        }
    },
    overlayLoadingTemplate: ' <div class="loop-loader loop-loader-xs">Loading...</div>',
    domLayout: 'autoHeight'
};

// $scope.data.gridOptions = {
//     headerHeight:36,
//     rowHeight: 42,
//     rowSelection: "multiple",
//     defaultColDef: {
//         // make every column editable
//         editable: false,
//         cellRenderer: function(params){
//           return '<span class="cell-wrapper">' + getParamValue(params) + '</span>'
//         }
//     },
//     overlayLoadingTemplate: ' <div class="loop-loader loop-loader-xs">Loading...</div>'
// };


//add vlaue getter logic
var getParamValue = function(params){
  if(params.value){
    //if value
    switch(params.colDef.field) {
      case 'name':
          var html = '<div class="avatar avatar-32 royal">JB</div>' + params.value
          return html;
          break;
      default:
          return params.value
    } 
  }
  else {
    return '--';
  }
}

var defaultCols = [
    {
        field: 'name',
        headerName: 'Name',
        rowGroup: false,
        hide: false
    },
    {
        headerName: "Game Name", field: "game.name", width: 267
    },
    {
        headerName: "Country", field: "country", width: 200
    },
    {
        headerName: "Language", field: "language", width: 200
    },
    {
        headerName: "Language", field: "language", width: 200
    },
    {
        headerName: "Language", field: "language", width: 200
    }
];


function createData() {

    $scope.data.gridOptions.api.showLoadingOverlay();

    var rowCount = 20;

    var row = 0;
    var data = [];

    for (var i = 0; i < rowCount; i++) {
        var rowItem = createRowItem(row);
        data.push(rowItem);
        row++;
    }

    $scope.data.gridOptions.api.setColumnDefs(defaultCols);
    $scope.data.gridOptions.api.setRowData(data);
}

function createRowItem(row) {
    var rowItem = {};

    //create data for the known columns
    var countryData = countries[row % countries.length];
    rowItem.country = countryData.country;
    rowItem.language = countryData.language;

    var firstName = firstNames[row % firstNames.length];
    var lastName = lastNames[row % lastNames.length];
    rowItem.name = firstName + " " + lastName;

    rowItem.game = {
        name: games[Math.floor(row * 13 / 17 * 19) % games.length],
    };
    rowItem.gameName = 'toolTip: ' + rowItem.game.name.toUpperCase();

    return rowItem;
}

	//functions
	//----------------------



  $timeout(function(){
     createData();
  }, 2500)



//-------------------------------------------


// ACTIVATE
//===========================================
// activation logic goes here
//-------------------------------------------


// FUNCTIONS
//===========================================

/*
function keydown
*/



//-------------------------------------------


// EVENTS
//===========================================
//-------------------------------------------

// WATCHES
//===========================================
// Watches go here
//-------------------------------------------

});
