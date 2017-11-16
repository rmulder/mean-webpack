import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import path from 'path';

var app = angular.module('myApp',['ui.router','ui.bootstrap','ngTouch','ngAnimate']);

app.config(function($stateProvider,$urlRouterProvider){
   $urlRouterProvider.otherwise('/home');

   $stateProvider

    .state('home',{
        url: '/home',
        templateUrl : path.join(__dirname,'templates','main.html')
    })
    .state('features',{
        templateUrl : path.join(__dirname,'templates','features.html')
    })
 
});

    