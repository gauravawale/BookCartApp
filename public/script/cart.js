'use strict';
 
angular.module('bookcart', ['ngRoute', 'navbar', 'bookcard'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'public/templates/firstPage.html',
        controller: 'firstPageCtrl'
      })
      .when('/homepage', {
          templateUrl: 'public/templates/homePage.html',
          controller: 'homePageCtrl'
      })
      .otherwise({
          redirectTo: '/homepage'
      });
}])

.factory('cartItemsFact', function () {

    var cartItems = {
    };
    var cartItemsCount = 0;

    return {
        getcartItems: function () {
            return cartItems;
        },
        setcartItems: function (book, quantity) {
            cartItems[book.id] = {
                'bookInfo': book,
                'BookName': book.name,
                'BookPrice': book.price,
                'Quantity': quantity,
                'ImageUrl': book.imgUrl,
                'Description': book.description
            };
            this.setCartItemsCount();
        },
        removeFromCart: function (bookid) {
            delete cartItems[bookid];
            this.setCartItemsCount();
        },
        getCartValue: function () {
            var cartValue = 0;
            for (var key in cartItems) {
                cartValue = cartValue + (cartItems[key].Quantity * cartItems[key].BookPrice);
            };
            return cartValue;
        },
        setCartItemsCount: function () {
            cartItemsCount = Object.keys(cartItems).length;
        },
        getCartItemsCount: function () {
            return cartItemsCount;
        }
    };
})

.controller('homePageCtrl', function($scope, $rootScope, $location, authentication, cartItemsFact, $http) {
    console.log($location);
    $scope.currentuser = authentication.currentUser();
    if (!$scope.currentuser) {
        $location.path("/");
        return;
    }

    $http.get("public/response.json").then(function(response) {
        $scope.books = response.data;
    });

    $http({
        method: 'POST',
        url: '/api/getbookinventory'
    }).then(function(res) {

        $scope.books = res.data;
        console.log("jhagsdjahgsdjhagsdjhg");


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

    $rootScope.$on("openCart", function() {
        $scope.openCart();
    });

    $scope.removeItem = function (bookid) {
        cartItemsFact.removeFromCart(bookid);
        $scope.cartItems = cartItemsFact.getcartItems();
        $scope.cartValue = cartItemsFact.getCartValue();
    }
})

.controller('firstPageCtrl', function($scope, $rootScope, $location, authentication, cartItemsFact, $http) {
    $scope.currentuser = authentication.currentUser();
    if ($scope.currentuser) {
        $location.path("/homepage");
        return;
    }

    $scope.signupcredentials = {
        name : "",
        email : "",
        password : ""
    };

    $scope.onSignUpSubmit = function() {
        authentication.register(
            $scope.signupcredentials,
            function(res) {
                //console.log(res.data.message);
                $scope.statusMessage = res.data.message;
            },
            function(err) {
                console.log(err.data.message);
                $scope.statusMessage = err.data.message;
            }
        );
    }

});