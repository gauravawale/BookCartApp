'use strict';
 
angular.module('bookcart', ['ngRoute', 'navbar', 'bookcard'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homepage', {
    templateUrl: 'public/templates/homePage.html',
    controller: 'homePageCtrl'
  });
}])

.controller('homePageCtrl', function($scope, $http) {
    $http.get("public/response.json").then(function(response) {
    	console.log(response);
        $scope.books = response.data;
    });
});