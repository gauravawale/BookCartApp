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