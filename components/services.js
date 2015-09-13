var howdoidoServices = angular.module('howdoidoServices', []);
howdoidoServices.config([
    "$httpProvider",
    function($httpProvider) {

    }
]);
//GENERIEKE METHODE
howdoidoServices.factory('restService', ['$http', '$q',
    function($http, $q) {
        var result = function(url, method, data) {
            var defer = $q.defer();

            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
        }

        return result;
    }
]);
//SPECIFIEKE GET METHODE VOOR PROFILE
howdoidoServices.factory('getProfileService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(id) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/profile/' + id;
            var method = 'GET';
            var data = '';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
//SPECIFIEKE METHODE VOOR NIEUWE PROFILE
howdoidoServices.factory('newProfileService', ['$http', '$q',
    function($http, $q) {
        
        var result = function() {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/profile';
            var method = 'POST';
            var data = {"post_status": "publish"};
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
//SPECIFIEKE METHODE VOOR UPDATE PROFILE
howdoidoServices.factory('updateProfileService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(id, data) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/profile/' + id;
            var method = 'POST';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
// newEducation
//SPECIFIEKE METHODE VOOR NIEUWE EDUCATION
howdoidoServices.factory('newEducationService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(data) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/education';
            var method = 'POST';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
// newMedia
//SPECIFIEKE METHODE VOOR NIEUWE MEDIA
howdoidoServices.factory('newMediaService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(data) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/medium';
            var method = 'POST';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
// newPosition
//SPECIFIEKE METHODE VOOR NIEUWE POSITION
howdoidoServices.factory('newPositionService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(data) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/position';
            var method = 'POST';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);
// newRecommendation
//SPECIFIEKE METHODE VOOR NIEUWE AANBEVELING
howdoidoServices.factory('newRecommendationService', ['$http', '$q',
    function($http, $q) {
        
        var result = function(data) {
            
            var defer = $q.defer();
            var url = 'http://www.xpressy.nl/backend/wp-json/pods/recommendation';
            var method = 'POST';
            
            $http({
                    method: method,
                    url: url,
                    cache: false,
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' //BELANGRIJK VOOR REST ENDPOINT!!!! Yodo
                    },
                    data: data
                })
                .success(function(data) {
                    console.log(data);
                    defer.resolve(data);
                });

            return defer.promise;
            
        }
        
        return result;
        
    }
]);