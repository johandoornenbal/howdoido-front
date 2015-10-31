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

    FormController.$inject = ['$scope', '$location', 'ROService', '$routeParams', '$rootScope', 'CurrentUserService', '$mdDialog', '$mdToast'];

    function FormController($scope, $location, ROService, $routeParams, $rootScope, CurrentUserService, $mdDialog, $mdToast) {

        var self = this;
        self.allTemplates = [];
        self.allUsers = [];
        self.querySearchTemplate = querySearchTemplate;
        self.querySearchUser = querySearchUser;

        loadAllUserData();
        getUsers();

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
                    if ($routeParams.templateId) {
                        self.allTemplates.forEach(
                            function(template) {
                                console.log(template.id);
                                console.log($routeParams.templateId);
                                if (template.id == $routeParams.templateId) {
                                    self.template = template;
                                }
                            }
                        );
                    }
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
            var lowercaseQuery = angular.lowercase(query).replace(/\s/g, '');
            return function filterFn(template) {
                return (template.name.replace(/\s/g, '').toLowerCase().indexOf(lowercaseQuery, 0) != -1 ||
                    template.category.replace(/\s/g, '').toLowerCase().indexOf(lowercaseQuery, 0) != -1);
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
            var lowercaseQuery = angular.lowercase(query).replace(/\s/g, '');
            return function filterFn(user) {
                return (user.title.replace(/\s/g, '').toLowerCase().indexOf(lowercaseQuery, 0) != -1);
            };
        }

        /////////////// SEND FORM /////////////////////////////////////////////////////////////////////////////

        $scope.sendRequest = function sendRequest(templateUri, userHref, email) {

            if (userHref) {
                console.log("href found");
                var payLoad = {
                    "orFindExistingUser": {
                        "href": userHref
                    }
                };
            }
            if (email) {
                console.log("email found");
                var payLoad = {
                    "typeInNameOrEmailAddress": email
                };
            }
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
                        var toast = $mdToast.simple()
                            .content('Request submitted.');
                        $mdToast.show(toast);
                        $scope.requestSubmitted = function() {
                            return true;
                        };
                        setTimeout(function(){ location.href = ''; }, 3000);
                    } else {
                        $scope.sendRequestResponseError = "ERROR";
                        var toast = $mdToast.simple()
                            .content('Ooops! Something went wrong. Please check email address and try again')
                            .action('OK')
                            .highlightAction(false);
                        $mdToast.show(toast).then(function(response) {
                            if (response == 'ok') {
                                location.href = '';
                            }
                        });
                        $scope.requestSubmitted = function() {
                            return true;
                        };
                        setTimeout(function(){ location.href = ''; }, 3000);
                    }
                });

        }

        /////////////// NAVIGATION /////////////////////////////////////////////////////////////////////////////

        $scope.navigateToNewTemplate = function() {
            $location.path('/templates/true');
        }

        $scope.goHome = function() {
            $location.path('/');
        }

    }

})();