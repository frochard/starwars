'use strict';

/**
 * @ngdoc overview
 * @name starwarsApp
 * @description
 * # starwarsApp
 *
 * Main module of the application.
 */
var swApp = angular.module('starwarsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
swApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/characters', {
        templateUrl: 'views/character.html',
        controller: 'searchCtrl',
        controllerAs: 'character'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
swApp.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
