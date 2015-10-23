(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .controller('FormController', FormController);

    HomeController.$inject = ['CurrentUserService', '$rootScope', '$q', '$location', 'ROService'];

    function HomeController(CurrentUserService, $rootScope, $q, $location, ROService) {
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
//        vm.test1 = null;
//        vm.test2 = [];
//        vm.test3 = {};

        initController();

        function initController() {
            loadAllUserData();
            getUsers();
//            test("objects/info.matchingservice.dom.Howdoido.BasicUser/0");
        }

        /* Example of ROService use */
        function test(href) {

            var test3 = function test3(href) {
                return ROService.GetRO(href).then(
                    function(data) {
                        vm.test3 = data;
                        return data;
                    }
                );
            }

            var getCollection = function getCollection(data) {
                return ROService.GetCollection(data.myTemplates.href)
                    .then(
                        function(data) {
                            vm.test2 = data;
                            return data;
                        }
                    );
            }
            
            test3(href).then(getCollection);
            
        }
        /* END Example of ROService use */

        function loadAllUserData() {
            CurrentUserService.GetData()
                .then(function(userdata) {
                    vm.user = userdata.data.user;
                    // update $rootScope.globals.currentUser
                    $rootScope.globals.currentUser.userdata = userdata.data.user;
                    vm.templates = userdata.data.user.templates;
                    vm.receivedRequests = userdata.data.user.receivedRequests;
                    vm.unratedReceivedFeedback = userdata.data.user.unratedReceivedFeedback;
                    vm.receivedFeedback = userdata.data.user.receivedFeedback;
                });
        }
        
        function getUsers() {
            ROService.PerformFunction(
                    'services/Api/actions/allUsers',
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

    FormController.$inject = ['$scope', '$location', 'ROService'];

    function FormController($scope, $location, ROService) {

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
                return false;
            };
            console.log(payLoad);
            ROService.PerformFunction(
                    templateUri + "/actions/createRequest",
                    payLoad,
                    'POST')
                .then(function(userdata) {
                    if (userdata.data != null) {
                        $scope.sendRequestResponse = userdata.data.result.members.OID.value;
                        $scope.requestSubmitted = function() {
                            return true;
                        };
                    } else {
                        $scope.sendRequestResponse = "Sorry... ERROR sending request";
                    }
                });

        }

    }


})();