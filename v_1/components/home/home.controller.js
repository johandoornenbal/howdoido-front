(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .controller('FormController', FormController);

    /////////////// HOMECONTROLLER /////////////////////////////////////////////////////////////////////////////
    
    HomeController.$inject = ['CurrentUserService', '$rootScope', '$routeParams', '$location', 'ROService'];

    function HomeController(CurrentUserService, $rootScope, $routeParams, $location, ROService) {
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
            // nothing to initialize yet
            // FormController sets data for HomeController as well
        }

        vm.createFeedbackUrl = function createFeedbackUrl(uri) {
            return '#/feedback/URL/' + uri;
        }

    }

    /////////////// FORMCONTROLLER /////////////////////////////////////////////////////////////////////////////
    
    FormController.$inject = ['$scope', '$location', 'ROService', '$routeParams', '$rootScope', 'CurrentUserService'];

    function FormController($scope, $location, ROService, $routeParams, $rootScope, CurrentUserService) {
        
        var self=this;
        self.allTemplates = [];
        self.allUsers = [];
        self.querySearchTemplate = querySearchTemplate;
        self.querySearchUser = querySearchUser;
        
        loadAllUserData();
        getUsers();
        
        if ($routeParams.templateId) {
            $scope.template = $routeParams.templateId;
            //TODO: function getTemplateById and then
            //$scope.template = getTemplateById($routeParams.templateId);
            console.log($scope.template);
        }

        $scope.send = function sendFeedbackRequest() {
            $location.path('/request');
        }
        
        function loadAllUserData() {
            CurrentUserService.GetData()
                .then(function(userdata) {
                    self.allTemplates = userdata.data.user.templates;
                    $scope.$parent.vm.user = userdata.data.user;
                    $rootScope.globals.currentUser.userdata = userdata.data.user;
                    $scope.$parent.vm.templates = userdata.data.user.templates;
                    $scope.$parent.vm.receivedRequests = userdata.data.user.receivedRequests;
                    $scope.$parent.vm.unratedReceivedFeedback = userdata.data.user.unratedReceivedFeedback;
                    $scope.$parent.vm.receivedFeedback = userdata.data.user.receivedFeedback;
                });
        }
        
        /////////////// TEMPLATES /////////////////////////////////////////////////////////////////////////////
        
        /**
         * Search for templates
         */
        function querySearchTemplate(query) {
            var results = query ? self.allTemplates.filter(createFilterFor(query)) : self.allTemplates;
            return results;
        }

        /**
         * Create filter function for a query string: spaces and case insensitive!!
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query).replace(/\s/g,'');
            return function filterFn(template) {
                return (template.name.replace(/\s/g,'').toLowerCase().indexOf(lowercaseQuery, 0) != -1);
            };
        }
        
        /////////////// USERS /////////////////////////////////////////////////////////////////////////////
        
        function getUsers() {
            ROService.PerformFunction(
                    'services/Api/actions/allUsers',
                    '',
                    'POST')
                .then(function(userdata) {
                    self.allUsers = userdata.data.result.value;
                });
        }

        
        /**
         * Search for users
         */
        function querySearchUser(query) {
            var results = query ? self.allUsers.filter(createFilterForUser(query)) : self.allUsers;
            return results;
        }

        /**
         * Create filter function for a query string: spaces and case insensitive!!
         */
        function createFilterForUser(query) {
            var lowercaseQuery = angular.lowercase(query).replace(/\s/g,'');
            return function filterFn(user) {
                return (user.title.replace(/\s/g,'').toLowerCase().indexOf(lowercaseQuery, 0) != -1);
            };
        }
        
        /////////////// SEND FORM /////////////////////////////////////////////////////////////////////////////
        
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

        /////////////// NAVIGATION /////////////////////////////////////////////////////////////////////////////
        
        $scope.navigateToNewTemplate = function() {
            $location.path('/templates/true');
        }

    }


})();