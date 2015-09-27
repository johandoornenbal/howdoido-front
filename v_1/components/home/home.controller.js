(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['CurrentUserService','IsisObjectService', '$rootScope'];
    
    function HomeController(CurrentUserService, IsisObjectService, $rootScope) {
        
        var vm = this;
        var payLoad={
            "typeInNameOrEmailAddress": "someoneelse@email.nl"
            };

        vm.user = null;
        vm.templates = [];
        vm.receivedRequests = [];
        vm.userdata = null;
        vm.allUsers = [];

        initController();

        function initController() {
            loadAllData();
            loadIsisObject('objects/info.matchingservice.dom.Howdoido.BasicTemplate/L_3');
            performFunction(payLoad);
            getUsers();
        }

        function loadAllData() {
            CurrentUserService.GetData()
                .then(function (userdata) {
                    vm.user = userdata.data.user;
                    vm.userdata = userdata;
                    vm.templates = userdata.data.user.templates;
                    vm.receivedRequests = userdata.data.user.receivedRequests;
                    vm.sendFeedbackRequest;
                });
        }
        
        function loadIsisObject(objectUri) {
            IsisObjectService.GetObjectData(objectUri)
            .then(function (userdata) {
                    vm.object = userdata.data;
                    vm.members = userdata.data.members;
                });
        }
        
        function performFunction(payload) {
            IsisObjectService.PerformFunctionOnObject(
                'objects/info.matchingservice.dom.Howdoido.BasicTemplate/L_3',
                'createRequest',
                payLoad,
                'POST')
            .then(function (userdata) {
                    vm.functionResponse = userdata.data;
                });
        }
        
        function getUsers() {
            IsisObjectService.PerformFunctionOnObject(
                'services/Api',
                'allUsers',
                '',
                'POST')
            .then(function (userdata) {
                    vm.allUsers = userdata.data.result.value;
                });
        }
        
        function sendFeedbackRequest() { 
            $location.path('/request');
        }

    }

})();