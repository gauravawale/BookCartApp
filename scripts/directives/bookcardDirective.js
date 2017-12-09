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