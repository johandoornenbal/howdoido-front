(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngAnimate', 'ngAria'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'components/home/home.view.html',
            controllerAs: 'vm'
        })
        
        .when('/tpl/:templateId?', {
            controller: 'HomeController',
            templateUrl: 'components/home/home.view.html',
            controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'components/login/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'components/register/register.view.html',
            controllerAs: 'vm'
        })

        .when('/request', {
            controller: 'RequestController',
            templateUrl: 'components/request/request.view.html',
            controllerAs: 'vm'
        })

        .when('/feedback/URL/:feedbackUrl', {
            controller: 'FeedbackController',
            templateUrl: 'components/feedback/feedback.view.html',
            controllerAs: 'vm'
        })

        //param 'new': set 'true' for direct creation of template
        .when('/templates/:new?', {
            controller: 'TemplatesController',
            templateUrl: 'components/templates/templates.view.html',
            controllerAs: 'vm'
        })

        .otherwise({
            redirectTo: '/login'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
        //set base url
        $rootScope.baseUrl = "http://localhost:8080/restful/";

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            //test voor CORS om te zien of 'PUT' probleem kan worden opgelost...
            //            $http.defaults.useXDomain = true;
            //            $http.defaults.withCredentials = true;
            //            delete $http.defaults.headers.common["X-Requested-With"];
            //            $http.defaults.headers.common["Accept"] = "application/json";
            //            $http.defaults.headers.common["Content-Type"] = "application/json";
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();