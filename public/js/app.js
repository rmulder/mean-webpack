var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

//Include the controllers

myApp.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: '/views/about.html'
    })
    .when('/signin', {
      templateUrl: '/views/signin.html',
      controller: 'HomeCtrl'
    })
    .when('/signup', {
      templateUrl: '/views/signup.html',
      controller: 'HomeCtrl'
    })
    .when('/me', {
      templateUrl: '/views/me.html',
      controller: 'MeCtrl'
    })
    .otherwise({
      templateUrl: '/views/404.html'
    });

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/signin');
        }
        return $q.reject(response);
      }
    };
  }]);

}]);


myApp.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthService', function($rootscope, $scope, $location, $localStorage, AuthService) {

  //Signin
  $scope.signin = function() {
    var formData = {
      email: $scope.email,
      password: $scope.password
    };

    AuthService.signin(formData, function(res) {
        console.log('Authenticating..');
    }, function() {
      $rootScope.error = 'Failed to signin';
    });

  };

  //Signup
  $scope.signup = function() {
    var formData = {
      email: $scope.email,
      password: $scope.password
    };

    AuthService.save(formData, function(res) {
       console.log('Checking User Data..');
    }, function() {
      $rootScope.error = 'Failed to signup';
    });
  };

  //Authenticated Route
  $scope.me = function() {
    AuthService.me(function(res) {
      console.log('Res' + res);
      $scope.myDetails = res;
    }, function() {
      $rootScope.error = 'Failed to fetch details';
    });
  };

  // Logout
  $scope.logout = function() {
    AuthService.logout(function() {
      $location.path('/');
    }, function() {
      $rootScope.error = 'Failed to logout';
    });
  };

}]);

myApp.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'AuthService', function($rootScope, $scope, $location, AuthService) {

  AuthService.me(function(res) {
     console.log('Service Works');
    $rootScope.myDetails = res;
  }, function() {
    $rootScope.error = 'Failed to fetch details';
  });
}]);


myApp.factory('AuthService', ['$http', '$location', '$localStorage', function($http, $location, $localStorage) {
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
    save: function(data, success, error) {
      $http({
        method: 'POST',
        url: baseUrl + '/signup',
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }).then(function successCallback(success) {
        console.log('Signup Successful : Redirecting');
        $localStorage.token = success.data.token;
        $location.path('/me');
        return (success);
      }, function errorCallback(error) {
        console.log(error);
        return (error);
      });

      //  $http.post(baseUrl + '/signup', data).success(success).error(error)
    },
    signin: function(data, success, error) {
      $http({
        method: 'POST',
        url: baseUrl+ '/signin',
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }).then(function successCallback(success) {
        console.log('Signin Successful : Redirecting');
        $localStorage.token = success.data.token;
        $location.path('/me');
        return (success);
      }, function errorCallback(error) {
        console.log(error);
        return (error);
      });
      //$http.post('http://localhost:4000/signin', data).success(success).error(error)
    },
    me: function(success, error) {
      $http({
        method: 'GET',
        url: baseUrl + '/me/',
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function successCallback(success) {
         return (success);
      }, function errorCallback(error) {
        console.log(error);
        return (error);
      });

    //  $http.get('http://localhost:4000/me/').success(success).error(error)
    },
    logout: function(success) {
      changeUser({});
      delete $localStorage.token;
      success();
    }
  };
}]);
