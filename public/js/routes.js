'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'templates/dashboard.html'
        }).state('tables', {
            url: '/tables',
            templateUrl: 'templates/tables.html'
        }).state('new-spec', {
            url: '/new-spec',
            templateUrl: 'templates/new-spec.html'
        }).state('spec', {
            url: '/spec/:specId',
            templateUrl: 'templates/spec.html',
            controller: function($scope, $stateParams) {
                $scope.specid = $stateParams.specId;
            }
        }).state('spec.send', {
            url: '/send',
            templateUrl: 'templates/send-spec.html',
            controller: function($scope, $stateParams) {
                $scope.specid = $stateParams.specId;
            }
        });;
        jwtInterceptorProvider.tokenGetter = [
            function() {
                return 'mock-token';
                //return localStorage.getItem('id_token');
            }
        ];
        $httpProvider.interceptors.push('jwtInterceptor');
    }
]);