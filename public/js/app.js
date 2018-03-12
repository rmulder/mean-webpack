
var myApp = angular.module('myApp', ['ngRoute']);

//Include the controllers

myApp.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html'
    })
    .when('/about', {
      templateUrl: '/views/about.html'
    })
    .otherwise({
      templateUrl: '/views/404.html'
    });

  $locationProvider.html5Mode(true);
});
