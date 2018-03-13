/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

//Include the controllers

myApp.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  }).when('/about', {
    templateUrl: '/views/about.html'
  }).when('/signin', {
    templateUrl: '/views/signin.html',
    controller: 'HomeCtrl'
  }).when('/signup', {
    templateUrl: '/views/signup.html',
    controller: 'HomeCtrl'
  }).when('/me', {
    templateUrl: '/views/me.html',
    controller: 'MeCtrl'
  }).otherwise({
    templateUrl: '/views/404.html'
  });

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
    return {
      'request': function request(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },
      'responseError': function responseError(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/signin');
        }
        return $q.reject(response);
      }
    };
  }]);
}]);

myApp.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthService', function ($rootscope, $scope, $location, $localStorage, AuthService) {

  //Signin
  $scope.signin = function () {
    var formData = {
      email: $scope.email,
      password: $scope.password
    };

    AuthService.signin(formData, function (res) {
      console.log('Authenticating..');
    }, function () {
      $rootScope.error = 'Failed to signin';
    });
  };

  //Signup
  $scope.signup = function () {
    var formData = {
      email: $scope.email,
      password: $scope.password
    };

    AuthService.save(formData, function (res) {
      console.log('Checking User Data..');
    }, function () {
      $rootScope.error = 'Failed to signup';
    });
  };

  //Authenticated Route
  $scope.me = function () {
    AuthService.me(function (res) {
      console.log('Res' + res);
      $scope.myDetails = res;
    }, function () {
      $rootScope.error = 'Failed to fetch details';
    });
  };

  // Logout
  $scope.logout = function () {
    AuthService.logout(function () {
      $location.path('/');
    }, function () {
      $rootScope.error = 'Failed to logout';
    });
  };
}]);

myApp.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'AuthService', function ($rootScope, $scope, $location, AuthService) {

  AuthService.me(function (res) {
    console.log('Service Works');
    $rootScope.myDetails = res;
  }, function () {
    $rootScope.error = 'Failed to fetch details';
  });
}]);

myApp.factory('AuthService', ['$http', '$location', '$localStorage', function ($http, $location, $localStorage) {
  var baseUrl = 'http://localhost:4000';
  function changeUser(user) {
    angular.extend(currentUser, user);
  }

  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  function getUserFromToken() {
    var token = $localStorage.token;
    var user = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      user = JSON.parse(urlBase64Decode(encoded));
    }
    return user;
  }

  var currentUser = getUserFromToken();

  return {
    save: function save(data, success, error) {
      $http({
        method: 'POST',
        url: baseUrl + '/signup',
        transformRequest: function transformRequest(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }).then(function successCallback(success) {
        console.log('Signup Successful : Redirecting');
        $localStorage.token = success.data.token;
        $location.path('/me');
        return success;
      }, function errorCallback(error) {
        console.log(error);
        return error;
      });

      //  $http.post(baseUrl + '/signup', data).success(success).error(error)
    },
    signin: function signin(data, success, error) {
      $http({
        method: 'POST',
        url: baseUrl + '/signin',
        transformRequest: function transformRequest(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }).then(function successCallback(success) {
        console.log('Signin Successful : Redirecting');
        $localStorage.token = success.data.token;
        $location.path('/me');
        return success;
      }, function errorCallback(error) {
        console.log(error);
        return error;
      });
      //$http.post('http://localhost:4000/signin', data).success(success).error(error)
    },
    me: function me(success, error) {
      $http({
        method: 'GET',
        url: baseUrl + '/me/',
        transformRequest: function transformRequest(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function successCallback(success) {
        return success;
      }, function errorCallback(error) {
        console.log(error);
        return error;
      });

      //  $http.get('http://localhost:4000/me/').success(success).error(error)
    },
    logout: function logout(success) {
      changeUser({});
      delete $localStorage.token;
      success();
    }
  };
}]);

/***/ })
/******/ ]);