import angular from 'angular';
import ngRoute from 'angular-route'; 
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';

var app = angular.module('myApp',['ngRoute','ngTouch','ngAnimate','ui.bootstrap']);

app.config(function($routeProvider,$locationProvider){
   $routeProvider
    .when('/',{
        templateUrl : './templates/main.html'
    })
    .otherwise({
         redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

    