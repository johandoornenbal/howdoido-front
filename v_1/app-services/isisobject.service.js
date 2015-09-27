(function() {
    'use strict';

    angular
        .module('app')
        .factory('IsisObjectService', IsisObjectService);

    IsisObjectService.$inject = ['$http', '$rootScope'];

    function IsisObjectService($http, $rootScope) {

        var baseURL = $rootScope.baseUrl;

        var service = {};
        var objectUri = '';
        var payload = {};

        service.GetObjectData = GetObjectData;
        service.PerformFunctionOnObject = PerformFunctionOnObject;

        return service;

        function GetObjectData(objectUri) {
            return $http.get(baseURL + objectUri)
                .then(handleSuccess, handleError('Error getting object data'));
        }

        /* payload can address arguments directly instead of using 'value' each time */
        function PerformFunctionOnObject(objectUri, functionName, payload, functionMethod) {

            var wrappedPayload = {};
            
            for (var key in payload) {
                wrappedPayload[key] = {"value" : payload[key]}
                console.log(wrappedPayload);
            }

            switch (functionMethod) {
                case 'POST':
                    return $http.post(baseURL + objectUri + '/actions/' + functionName + '/invoke',
                            wrappedPayload)
                        .then(handleSuccess, handleError('Error getting object data'));
                    break;

                case 'PUT':
                    return $http.put(baseURL + objectUri + '/actions/' + functionName + '/invoke',
                            wrappedPayload)
                        .then(handleSuccess, handleError('Error getting object data'));
                    break;
                    
                case 'GET':
                    return $http.get(baseURL + objectUri + '/actions/' + functionName + '/invoke',
                            wrappedPayload)
                        .then(handleSuccess, handleError('Error getting object data'));
                    break;    

                default:
                    return 'functionmethod not allowed';
            }
            
        }

        // private functions

        function handleSuccess(data) {
            return data;
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