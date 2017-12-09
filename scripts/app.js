/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute'
]);

// constant for base URL. Change this on production server
rootModule.constant('baseUrl', 'http://localhost:3000');


/* 
This file should only hold routing settings for app
*/
rootModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/loginPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/homepage', {
            templateUrl: 'templates/homePage.html',
            controller: 'homePageCtrl'
        })
        .otherwise({
            redirectTo: '/homepage'
        });
}])


/**
 * Created by awaleg on 09/12/17.
 */
rootModule.controller('homePageCtrl', function($scope, $http) {

    $http.get("http://localhost:3000/books").then(function(response) {
        $scope.books = response.data;
        console.log('Hellokahsdjahsg');
        console.log(response.data);
    });

    //$rootScope.cartItems = {};

    $scope.selectBook = function(book) {
        var currentcart = cartItemsFact.getcartItems();
        $scope.currentBook = book;
        $scope.currentBookName = $scope.currentBook.name;
        $scope.currentBookImgUrl = $scope.currentBook.imgUrl;
        $scope.description = $scope.currentBook.description;
        $scope.quantity = currentcart[book.id] ? currentcart[book.id].Quantity : 1;
    }

    $scope.addToCart = function() {
        cartItemsFact.setcartItems($scope.currentBook, $scope.quantity);
        setTimeout("jQuery('#bookInfo').modal('hide')", 600);
    }

    $scope.openCart = function() {
        $scope.cartItems = cartItemsFact.getcartItems();
        $scope.cartValue = cartItemsFact.getCartValue();
    }

    //$rootScope.$on("openCart", function() {
    //    $scope.openCart();
    //});

    $scope.removeItem = function (bookid) {
        cartItemsFact.removeFromCart(bookid);
        $scope.cartItems = cartItemsFact.getcartItems();
        $scope.cartValue = cartItemsFact.getCartValue();
    }
});



/**
 * Created by awaleg on 09/12/17.
 */
rootModule.controller('loginPageCtrl', function($scope) {
});


var bookcard = angular.module("bookcard", []);

//Create a directive, first parameter is the html element to be attached.	  
//We are attaching student html tag. 
//This directive will be activated as soon as any student element is encountered in html

rootModule.directive('bookcard', function() {
   //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';

   
   //template replaces the complete element with its text. 
   //directive.template = "<div>Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b></div>";
   directive.templateUrl = "templates/bookcard.html";
   
   //compile is called during application initialization. AngularJS calls it once when html page is loaded.
	return directive;
   directive.compile = function(element, attributes) {
      element.css("border", "1px solid #cccccc");
      
      //linkFunction is linked with each element with scope to get the element specific data.
      /*
      var linkFunction = function($scope, element, attributes) {
         element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
         element.css("background-color", "#ff00ff");
      }
      */
      //return linkFunction;
   }
   return directive;
});


var bookcart = angular.module("navbar", []);

//Create a directive, first parameter is the html element to be attached.	  
//We are attaching student html tag. 
//This directive will be activated as soon as any student element is encountered in html

rootModule.directive('navbar', function() {
   //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text. 
   //directive.template = "<div>Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b></div>";
   directive.templateUrl = "templates/navbar.html";

   var controller = ['$scope', '$location', 'cartItemsFact', 'authentication', '$rootScope', '$http', function ($scope, $location, cartItemsFact, authentication, $rootScope, $http) {

       $scope.currentuser = authentication.currentUser();
       console.log($scope.currentuser);


       $scope.signincredentials = {
           email : "",
           password : ""
       };

       $scope.getcartItemsFact = function() {
           return cartItemsFact.getCartItemsCount();
       }

       $scope.$watch("getcartItemsFact()", function(newValue, oldValue) {
           if (oldValue != newValue) {
               $scope.cartItemsCount = newValue;
               $scope.setCurrentCart({
                   'useremail': $scope.currentuser.email,
                   'cartItems': JSON.stringify(cartItemsFact.getcartItems())
               });
           }
       });

       $scope.openCart = function() {
           $rootScope.$emit("openCart", {});
       }


       $scope.onSignInSubmit = function() {
           authentication.login(
               $scope.signincredentials,
               function() {
                   $scope.currentuser = authentication.currentUser();
                   $scope.currentCart = $scope.getCurrentCart($scope.currentuser.email);
                   $location.path('/homepage');
               },
               function(err) {
                   console.log(err.data.message)
               }
           );
       }

       $scope.onLogOut = function() {
           authentication.logout();
           $scope.currentuser = authentication.currentUser();
       }

       $scope.setCurrentCart = function(data) {
           $http({
               method: 'POST',
               url: '/api/setcurrentcart',
               data: data
           });
       };

       $scope.getCurrentCart = function(data) {
           $http({
               method: 'POST',
               url: '/api/getcurrentcart',
               data: {
                   email: data
               }
           }).then(function(res) {
               $scope.currentCart =  res.data;
               //get the book details by sendind the array of bookids
               $scope.currentCartObj = JSON.parse($scope.currentCart.bookids);
               for (var key in $scope.currentCartObj) {
                   cartItemsFact.setcartItems($scope.currentCartObj[key].bookInfo, $scope.currentCartObj[key].Quantity);
               }


           });
       };

       if ($scope.currentuser) {
           // Check for existing cart values
           console.log('Hello ahdkahjsdkj');
           $scope.currentCart = $scope.getCurrentCart($scope.currentuser.email);

       }
   }];
    directive.controller = controller;
    return directive;
   //compile is called during application initialization. AngularJS calls it once when html page is loaded.

   directive.compile = function(element, attributes) {
      element.css("border", "1px solid #cccccc");
      
      //linkFunction is linked with each element with scope to get the element specific data.
      /*
      var linkFunction = function($scope, element, attributes) {
         element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
         element.css("background-color", "#ff00ff");
      }
      */
      //return linkFunction;
   }
   return directive;
});