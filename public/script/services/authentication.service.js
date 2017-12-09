/**
 * Created by awaleg on 26/09/17.
 */
(function () {

    angular
        .module('bookcart')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication ($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        register = function(user, successfunc, errorfunc) {
            $http({
                method: 'POST',
                url: '/api/register',
                data: user
            }).then(function(data) {
                saveToken(data.token);
                successfunc();
            }).then(function(data) {
                errorfunc(data);
            });
        };

        login = function(user, successfunc, errorfunc) {
            $http({
                method: 'POST',
                url: '/api/login',
                data: user
            }).then(function(data) {
                saveToken(data.data.token);
                successfunc();
            }, errorfunc);
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }


})();