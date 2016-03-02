//URL d'acces à l'API Starwars
var swApiUrl = "http://swapi.co/api/";


/******************************/
/* Definition des controlleurs*/
/******************************/
swApp.controller('searchCtrl',searchCharacter);
swApp.controller('infoCtrl', infoCharacter);


/******************************/
/* Definition des fonctions */
/******************************/

function searchCharacter($scope, $http,$log,starwarsFactory){
  $scope.characterList = [
    {"name": "Luke Skywalker","url": "http://swapi.co/api/people/1/"},
    {"name": "C-3PO","url": "http://swapi.co/api/people/2/"},
    {"name": "R2-D2","url": "http://swapi.co/api/people/3/"},
    {"name": "Darth Vader","url": "http://swapi.co/api/people/4/"}
  ];

  //On recupere l'URL pour lister les personnages
  var urlList = swApiUrl+"people/";
  //On initialise la table
  $scope.APIList=[];
  //On definit
  var exec = function(url){
    $http.get(url).then(function(response1) {
      $scope.APIList= $scope.APIList.concat(response1.data.results);
      if (response1.data.next != null)
        exec(response1.data.next);
    });

  }

  exec(urlList);

  $scope.$log = $log;

  $scope.go = function(url) {
    //On supprime le dernier caractère /
    var urlSansDernierChar = url.slice(0, -1)
    //On récupère la valeur de l'id après le dernier caractère /
    var idUrl = urlSansDernierChar.substring(urlSansDernierChar.lastIndexOf('/') + 1);
    //On change le personnage courant dans notre service
    starwarsFactory.setId(idUrl);
  }
}

function infoCharacter($scope, $http, $log, characterInfo, starwarsFactory){
  $scope.starwarsFactory = starwarsFactory; //ATTENTION: Ne pas oublier de rajouter le service dans le scope si on veut utiliser $scope.$watch
  //On rappelle ce traitement à chaque changement de variable de sendSearch.id
  $scope.$watch('starwarsFactory.getId()', function() {
    //On récupere en indiquant l'id un pokemon
    var character = characterInfo.get({id:starwarsFactory.getId()});
    //Une fois le résultat récuperer on va enregistrer dans des variables les infos
    character.$promise.then(function (result) {
      $scope.character = result;
      $scope.id = starwarsFactory.getId();
    }, true);
  });
}


/******************************/
/* Definition des services */
/******************************/


/* Service qui récupère les infos du personnage*/
swApp.factory('characterInfo', function($resource) {return $resource(swApiUrl+"people/:id/",{id:'@id'});});


/* Service qui stocke le personnage courant*/
swApp.factory('starwarsFactory', function() {
  var character= {id: 0};
  //Setter qui renseigne l'Id du perso courant
  character.setId = function(num){
    character.id=num;
  }
  //Setter qui recupere l'Id du perso courant
  character.getId = function (){
    return character.id;
  }
  return character;
});
