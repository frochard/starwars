/**
 * Created by user1 on 01/03/2016.
 */

//Definition de l'application
var swApp = angular.module('starwarsApp', ['ngResource']);

swApp.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

//URL d'acces à l'API Starwars
var swApiUrl = "http://swapi.co/api/";


/******************************/
/* Definition des controlleurs*/
/******************************/

swApp.controller('searchCtrl', searchCharacter());
swApp.controller('infoCtrl', infoCharacter());


/******************************/
/* Definition des fonctions */
/******************************/

function searchCharacter($scope){
  $scope.characterList = [
      {"name": "Luke Skywalker","url": "http://swapi.co/api/people/4/"},
      {"name": "C-3PO","url": "http://swapi.co/api/people/4/"},
      {"name": "R2-D2","url": "http://swapi.co/api/people/4/"},
      {"name": "Darth Vader","url": "http://swapi.co/api/people/4/"}
  ];



}


function infoCharacter($scope){

}
