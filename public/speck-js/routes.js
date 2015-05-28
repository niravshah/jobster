'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider,$locationProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('tables', {
            url: '/tables',
            templateUrl: '/templates/tables.html'
        }).state('new-spec', {
            url: '/spec/new',
            templateUrl: '/spec-templates/new-spec.html'
        }).state('spec', {
            url: '/spec/:specId',
            templateUrl: '/spec-templates/spec.html',
            controller: function($scope, $stateParams) {
                $scope.specid = $stateParams.specId;
            }
        }).state('spec.send', {
            url: '/send',
            templateUrl: '/spec-templates/send-spec.html',
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
		$locationProvider.html5Mode({enabled:true,requireBase: false});
    }
]);