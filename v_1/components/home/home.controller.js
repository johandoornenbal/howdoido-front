(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .controller('FormController', FormController);

    HomeController.$inject = ['CurrentUserService', 'IsisObjectService', 'IsisCollectionService', '$rootScope', '$q', '$location'];

    function HomeController(CurrentUserService, IsisObjectService, IsisCollectionService, $rootScope, $q, $location) {
        var vm = this;
        vm.user = null;
        vm.templates = [];
        vm.receivedRequests = [];
        vm.userdata = null;
        vm.allUsers = [];
        vm.sendRequest = null;
        vm.sendRequestResponse = null;
        vm.receivedFeedback = [];
        vm.unratedReceivedFeedback = [];

        initController();

        function initController() {
            loadAllData();
            getUsers();
        }

        function loadAllData() {
            CurrentUserService.GetData()
                .then(function(userdata) {
                    vm.user = userdata.data.user;
                    vm.userdata = userdata;
                    vm.templates = userdata.data.user.templates;
                    vm.receivedRequests = userdata.data.user.receivedRequests;
                    vm.unratedReceivedFeedback = userdata.data.user.unratedReceivedFeedback;
                    vm.receivedFeedback = userdata.data.user.receivedFeedback;
                });
        }

        function loadIsisObject(objectUri) {
            IsisObjectService.GetObjectData(objectUri)
                .then(function(userdata) {
                    vm.object = userdata.data;
                    vm.members = userdata.data.members;
                });
        }

        function getUsers() {
            IsisObjectService.PerformFunctionOnObject(
                    'services/Api',
                    'allUsers',
                    '',
                    'POST')
                .then(function(userdata) {
                    vm.allUsers = userdata.data.result.value;
                });
        }

        vm.createFeedbackUrl = function createFeedbackUrl(uri) {
            return '#/feedback/URL/' + uri;
        }

    }

    FormController.$inject = ['$scope', '$location', 'IsisObjectService'];

    function FormController($scope, $location, IsisObjectService) {

        $scope.send = function sendFeedbackRequest() {
            $location.path('/request');
        }

        $scope.sendRequest = function sendRequest(templateUri, userHref) {

            var payLoad = {
                "orFindExistingUser": {
                    "href": userHref
                }
            };
            $scope.requestSubmitted = function() {
                return false
            };
            console.log(payLoad);
            IsisObjectService.PerformFunctionOnObject(
                    templateUri,
                    'createRequest',
                    payLoad,
                    'POST')
                .then(function(userdata) {
                    if (userdata.data != null) {
                        $scope.sendRequestResponse = userdata.data.result.members.OID.value;
                        $scope.requestSubmitted = function() {
                            return true
                        };
                    } else {
                        $scope.sendRequestResponse = "Sorry... ERROR sending request";
                    }
                });

        }

    }


})();