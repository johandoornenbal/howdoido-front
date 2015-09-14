(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['CurrentUserService', '$rootScope'];
    function HomeController(CurrentUserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.templates = [];
        vm.receivedRequests = [];
        vm.userdata = null;

        initController();

        function initController() {
            loadAllData();
        }

        function loadAllData() {
            CurrentUserService.GetData()
                .then(function (userdata) {
                    vm.user = userdata.data.user;
                    vm.userdata = userdata;
                    vm.templates = userdata.data.user.templates;
                    vm.receivedRequests = userdata.data.user.receivedRequests;
                });
        }

    }

})();