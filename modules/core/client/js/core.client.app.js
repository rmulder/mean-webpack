import angular from 'angular';
import ngRoute from 'angular-route';
import path from 'path';

var app = angular.module('myApp', ['ngRoute']);

//Include the controllers

myApp.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html'
    })
    // .when('/blog', {
    //   templateUrl: path.join(__dirname, 'views', 'blog', 'posts.html'),
    //   controller: 'postsCtrl'
    // })
    // .when('/blog/posts/:post_id', {
    //   templateUrl: path.join(__dirname, 'views', 'blog', 'post.html'),
    //   controller: 'postCtrl'
    // })
    // .when('/blog/newpost', {
    //   templateUrl: path.join(__dirname, 'views', 'blog', 'newpost.html'),
    // })
    // .when('/users', {
    //   templateUrl: path.join(__dirname, 'views', 'users.html'),
    // })
    // .when('/login', {
    //   templateUrl: path.join(__dirname, 'views', 'auth', 'login.html'),
    // })
    // .when('/register', {
    //   templateUrl: path.join(__dirname, 'views', 'auth', 'register.html'),
    //   controller: 'registerCtrl'
    // })
    .otherwise({
      templateUrl: path.join(__dirname, 'views', '404.html')
    });

  $locationProvider.html5Mode(true);
});

// app.service('postsCrudService', ['$http', function($http) {
//
// this.addPost = function addPost(title, body) {
//   return $http({
//     method: 'POST',
//     url: 'api/posts',
//     data: {
//       title: title,
//       body: body
//     }
//   });
// };
//
// this.getPosts = function getPosts() {
//   return $http({
//     method: 'GET',
//     url: 'api/posts'
//   });
// };
//
// this.getSinglePost = function getSinglePost(id){
//   return $http({
//             method : 'GET',
//             url : 'api/posts/' + id
//         });
// };
//
// this.updatePost = function updateUser(id, title, body) {
//     return $http({
//         method : 'PATCH',
//         url : 'api/posts/' + id,
//         data : {
//             title : title,
//             body: body
//         }
//     });
// };
//
// this.deletePost = function deletePost(id){
//   return $http({
//         method : 'DELETE',
//         url : 'api/posts/' + id
//     });
// };
//
// })]); //End of post Service
//
// app.controller('postsCtrl', ['$scope', 'postsCrudService', function($scope, postsCrudService) {
//
//   $scope.addPost = function() {
//     postCrudService.addPost($scope.post.title, $scope.post.body)
//       .then(
//         function success(response) {
//           console.log('Post Added ');
//           $scope.message = 'Post Added';
//           $scope.errorMessage = '';
//         },
//         function error(response) {
//           console.log('Error Adding User');
//           $scope.message = '';
//           $scope.errorMessage = 'Error Adding User';
//
//         });
//   }]);
//
//   $scope.getAllPosts = function(){
//     postCrudService.getAllPosts()
//       .then(function success(response) {
//           $scope.posts = response.data._embedded.posts;
//           $scope.message='';
//           $scope.errorMessage = '';
//       },
//       function error (response) {
//           $scope.message='';
//           $scope.errorMessage = 'Error getting posts!';
//       });
//   };
//
//   $scope.getSinglePost = function(){
//     var id = $scope.post.id;
//          postCrudService.getSinglePost($scope.post.id)
//            .then(function success(response) {
//                $scope.post = response.data;
//                $scope.post.id = id;
//                $scope.post.title = title;
//                $scope.post.body = body;
//                console.log($scope.post.id, $scope.post.title, $scope.post.body);
//                $scope.message='';
//                $scope.errorMessage = '';
//            },
//            function error (response) {
//                $scope.message = '';
//                if (response.status === 404){
//                    $scope.errorMessage = 'User not found!';
//                }
//                else {
//                    $scope.errorMessage = "Error getting user!";
//                }
//            });
//   };
//
//   $scope.updateSinglePost = function(){
//     postCrudService.updateSinglePost($scope.post.id,
//        $scope.post.title, $scope.post.body)
//        .then(function success(response) {
//            $scope.message = 'Post data updated!';
//            $scope.errorMessage = '';
//        },
//        function error(response) {
//            $scope.errorMessage = 'Error updating post!';
//            $scope.message = '';
//        });
//   };
//
//   $scope.deleteSinglePost = function(){
//     postCrudService.deleteSinglePost($scope.post.id)
//     .then (function success(response) {
//         $scope.message = 'Post deleted!';
//         $scope.Post = null;
//         $scope.errorMessage='';
//     },
//     function error(response) {
//         $scope.errorMessage = 'Error deleting post!';
//         $scope.message='';
//     });
//   };
//
// }]);


// Display all Posts
// myApp.controller('postsCtrl',['$scope', '$http', function($scope, $http){
//               $scope.posts = [];
//               $http.get("/api/posts")
//                   .then(function(response){
//                     $scope.posts = response.data;
//                     console.log($scope.posts);
//                   });
// }]);
//
// // Display Single Post
// myApp.controller('postCtrl',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
//
//               $scope.post = [];
//               $http.get("/api/posts/" +$routeParams.post_id)
//               .then(function(response){
//                 $scope.post = response.data;
//                 $scope.post.id = response.data._id;
//                 $scope.post.title = response.data.title;
//                 $scope.post.body = response.data.body;
//                 console.log($scope.post);
//               });
//             }]);
//
// // Edit Single post
// myApp.controller('postsCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams){
//
//              if(request==GET){
//
//              }
//              if(request==POST){
//
//              }
//              if(request==PUT){
//
//              }
//              if(request==DELETE){
//
//              }
// }]);
//

// Authentication

// Register a new user

// myApp.controller('registerCtrl',['$scope', '$http', '$location', function($scope, $http, $location){
//
//   //Grab the form credentials
//   $scope.register = function() {
//     $scope.credentials = {
//       fullname: $scope.fullname,
//       username: $scopr.username,
//       email : $scope.email,
//       password : $scope.password
//     };
//
//     $http.post('/api/auth/register', $scope.credentials)
//          .then(function(response){
//             if(response.data.success==true){
//               console.log('User Registration Successful !');
//               $location.path('/login');
//             }
//             else{
//               console.log('User Registration Failed !');
//               $location.path('/register');
//             }
//           })
//         .catch(function activateError(error) {
//           console.log(error);
//          });
//   };
//
// }]);
