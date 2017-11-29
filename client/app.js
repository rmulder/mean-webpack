import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import path from 'path';

var app = angular.module('myApp',['ui.router','ui.bootstrap','ngTouch','ngAnimate']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  
    $urlRouterProvider.otherwise('/');

   $stateProvider

    .state('home',{
        url: '/',
        templateUrl : path.join(__dirname,'templates','main.html')
    })
    .state('features',{
        url: '/features',
        templateUrl : path.join(__dirname,'templates','features.html')
    })
    .state('login',{
        url: '/login',
        templateUrl : path.join(__dirname,'templates','login.html'),
        controller: 'LoginCtrl'
    });

    $locationProvider.html5Mode(true);
 
});

    