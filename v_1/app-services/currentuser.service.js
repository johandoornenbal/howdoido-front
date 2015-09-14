(function () {
    'use strict';

    angular
        .module('app')
        .factory('CurrentUserService', CurrentUserService);

    CurrentUserService.$inject = ['$http'];
    function CurrentUserService($http) {
        var service = {};

        service.GetData = GetData;

        return service;

        function GetData() {
            return $http.get('http://localhost:8080/restful/hdid/').then(handleSuccess, handleError('Error getting currentuser data'));
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
