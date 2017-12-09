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
