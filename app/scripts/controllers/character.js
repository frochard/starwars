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

  var urlList = swApiUrl+"people/";
 //Cette solution fonctionne
  $http.get(urlList).then(function(response) {
    $scope.APIdata = response.data;
    $scope.APIList = $scope.APIdata.results;
  });
//    console.log(response.data);
/*
  });

  var next = function (url) {
    var list2
    $http.get(url).then(function(response) {
      list2 = response.data;
      console.log(list2);
    })
    return list2
  }

  $http.get(urlList).then(function(response) {
    $scope.APIdata = response.data;
    $scope.APIList = $scope.APIdata.results;
    var url = response.data.next;

//    console.log(response.data);

  });

*/

  //Solution alternative

  /*var data= $http.get(urlList).then(function(response){return response.data});
  console.log(data);*/

/*  var data= $http.get(urlList);//.then(function(response) {return response.data;});
  console.log(data);
  var results=data.results;
  console.log(results);
  var i =2;
   var nextPage="http://swapi.co/api/people/?page="+i;
   console.log(data.next);
   while(data.next=nextPage){
     data= $http.get(nextPage);//.then(function(response) {return response.data;});
     results=results.concat($scope.APIdata.results);
   i++;
   nextPage="http://swapi.co/api/people/?page="+i;
   }
   $scope.APIList = $scope.APIdata.results;

  var recupNext= function(url){
  }*/



  $scope.$log = $log;

  $scope.go = function(url) {
    var urlSansDernierChar = url.slice(0, -1)
    var idUrl = urlSansDernierChar.substring(urlSansDernierChar.lastIndexOf('/') + 1);
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

/* Déclaration d'un service qui permet d'envoyer les infos du controler pour la recherche vers le controler pour l'affichage*/
swApp.factory('starwarsFactory', function() {
  var data= {id: 0};

  data.setId = function(num){
    data.id=num;
  }
  data.getId = function (){
    return data.id;
  }
  return data;
});

/* Déclaration d'un service qui permet de récuperer un pokemon (on l'appellera avec "pokeInfo.get"):
 ce service lance des requete sur un lien précis*/
swApp.factory('characterInfo', function($resource) {return $resource(swApiUrl+"people/:id/",{id:'@id'});});
