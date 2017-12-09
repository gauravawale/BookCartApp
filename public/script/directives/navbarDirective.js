var bookcart = angular.module("navbar", []);

//Create a directive, first parameter is the html element to be attached.	  
//We are attaching student html tag. 
//This directive will be activated as soon as any student element is encountered in html

bookcart.directive('navbar', function() {
   //define the directive object
   var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text. 
   //directive.template = "<div>Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b></div>";
   directive.templateUrl = "public/templates/navbar.html";

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