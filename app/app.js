import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import path from 'path';

var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate']);

//Include the controllers

myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: path.join(__dirname, 'templates', 'main.html')
        })
        .state('features', {
            url: '/features',
            templateUrl: path.join(__dirname, 'templates', 'features.html')
        })
        .state('logs', {
            url: '/logs',
            templateUrl: path.join(__dirname, 'templates', 'logs.html'),
            controller: 'logsCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: path.join(__dirname, 'templates', 'login.html')

        })
        .state('signup', {
            url: '/signup',
            templateUrl: path.join(__dirname, 'templates', 'signup.html')
        });


    $locationProvider.html5Mode(true);

});


// Controller for blog

myApp.controller('logsCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.logs = [];
    $http.get("http://localhost:4000/api/logs")
        .then(function (data) {
            $scope.logs = data.data;
            console.log($scope.logs);
        });
}]);
