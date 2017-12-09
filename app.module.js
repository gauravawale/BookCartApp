/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute'
]);

// constant for base URL. Change this on production server
rootModule.constant('baseUrl', 'http://localhost:3000');