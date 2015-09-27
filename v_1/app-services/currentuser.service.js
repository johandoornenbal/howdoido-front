(function () {
    'use strict';

    angular
        .module('app')
//        .factory('BaseUrl', BaseUrl)
        .factory('CurrentUserService', CurrentUserService);
    
//    function BaseUrl(){
//        var baseLocal = "http://acc.xtalus.gedge.nl/simple/restful/";
//        var baseRemote = "http://example.com/api";
//        var baseURL = baseLocal;
//        return baseURL;
//    }

    CurrentUserService.$inject = ['$http', '$rootScope'];
    function CurrentUserService($http, $rootScope) {
        var service = {};

        service.GetData = GetData;

        return service;

        function GetData() {
            return $http.get($rootScope.baseUrl + 'hdid/').then(handleSuccess, handleError('Error getting currentuser data'));
        }

        // private functions

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
