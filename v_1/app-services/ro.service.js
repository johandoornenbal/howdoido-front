(function() {
    'use strict';

    angular
        .module('app')
        .factory('ROService', ROService);

    ROService.$inject = ['$http', '$rootScope'];

    function ROService($http, $rootScope) {

        var baseURL = $rootScope.baseUrl;

        var service = {};
        var objectUri = '';
        var payload = {};

        service.GetRO = GetRO;
        service.GetCollection = GetCollection;
        service.PerformFunction = PerformFunction;
        return service;

        /** 
            returns a 'flattened' Restful Object 
        */
        function GetRO(hrefOrUri) {
            return $http
                .get(ToHref(hrefOrUri))
                .then(function(data) {
                    return GetMembers(data);
                });
        }

        /* helper function; returns the members of the RO calling */
        function GetMembers(data) {
            var output = {};
            output["title"] = data.data.title;
            for (var element in data.data.members) {
                // console.log(element);
                switch (data.data.members[element].memberType) {
                    case "property":
                        // console.log(data.data.members[element].value);
                        var id = data.data.members[element].id;
                        var value = data.data.members[element].value;
                        var href = data.data.members[element].links[0].href;
                        output[id] = {
                            value, href
                        };
                        break;

                    case "collection":
                        var id = data.data.members[element].id;
                        var href = data.data.members[element].links[0].href;
                        output[id] = {
                            href
                        };
                        break;

                    case "action":
                        var id = data.data.members[element].id;
                        var href = data.data.members[element].links[0].href;
                        output[id] = {
                            href
                        };
                        break;

                }
            }
            console.log(output);
            return output;
        }

        /* Helper function creates href from href or uri */
        function ToHref(hrefOrUri) {
            // determine href
            var href = null;
            if (hrefOrUri.substr(0, 7) != "http://") {
                href = baseURL + hrefOrUri;
            } else {
                href = hrefOrUri;
            }
            return href;
        }

        /**
            returns array of href's of objects in the collection
        */
        function GetCollection(hrefOrUri) {
            return $http
                .get(ToHref(hrefOrUri))
                .then(function(data) {
                    var result = [];
                    data.data.value.forEach(function(element) {
                        result.push(element.href);
                    });
                    return result;
                });
        }

        /**
            this function takes as input a href from 'flattened' Restful Object, the payload and the http method
            it returns the output as given by the RO api
        */
        function PerformFunction(hrefOrUri, payload, functionMethod) {

            var wrappedPayload = {};

            for (var key in payload) {
                wrappedPayload[key] = {
                    "value": payload[key]
                }
                console.log(wrappedPayload);
            }

            switch (functionMethod) {
                case 'POST':
                    return $http.post(ToHref(hrefOrUri) + '/invoke',
                        wrappedPayload).then(handleSuccess, handleError('Error performing function'));
                    break;

                case 'PUT':
                    return $http.put(ToHref(hrefOrUri) + '/invoke',
                        wrappedPayload).then(handleSuccess, handleError('Error performing function'));
                    break;

                case 'GET':
                    return $http.get(ToHref(hrefOrUri) + '/invoke',
                        wrappedPayload).then(handleSuccess, handleError('Error performing function'));
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
            return function () {
                return { success: false, message: error };
            };
        }

    }

})();