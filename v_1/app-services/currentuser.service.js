(function () {
    'use strict';

    angular
        .module('app')
        .factory('CurrentUserService', CurrentUserService);
    

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
            console.log(data);
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
