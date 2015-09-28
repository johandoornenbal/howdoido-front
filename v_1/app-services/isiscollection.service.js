(function() {
    'use strict';

    angular
        .module('app')
        .factory('IsisCollectionService', IsisCollectionService);

    IsisCollectionService.$inject = ['$http', '$rootScope'];

    function IsisCollectionService($http, $rootScope) {

        var baseURL = $rootScope.baseUrl;

        var service = {};
        var objectUri = '';

        service.GetObjectData = GetObjectData;
        service.GetCollection = GetCollection;
        service.GetCollectionPromise = GetCollectionPromise;

        return service;

        function GetObjectData(objectUri) {
            return $http.get(baseURL + objectUri)
                .then(handleSuccess, handleError('Error getting object data'));
        }

        function GetCollectionPromise(objectUri, collectionName) {

            return $http.get(baseURL + objectUri + '/collections/' + collectionName);
//                .then(handleSuccess, handleError('Error getting object data'));

        }
        
        function GetCollection(objectUri, collectionName) {

            return $http.get(baseURL + objectUri + '/collections/' + collectionName)
                .then(handleSuccess, handleError('Error getting object data'));

        }

        // private functions

        function handleSuccess(data) {
            return data.value;
        }

        function handleError(error) {
            return function() {
                return {
                    success: false,
                    message: error
                };
            };
        }
    }

})();