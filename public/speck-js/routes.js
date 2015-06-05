'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, $locationProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('home', {
            url: '/speck/home',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/dash.html'
                },
                'sidebar': {
                    templateUrl: '/speck-templates/sidebar.html'
                },
                'header': {
                    templateUrl: '/speck-templates/header.html'
                },
				'chat':{
					templateUrl: '/speck-templates/chat.html'
				}
            }
        }).state('tables', {
            url: '/tables',
            templateUrl: '/speck-templates/tables.html'
        }).state('new-spec', {
            url: '/speck/new',
            templateUrl: '/speck-templates/new-spec.html'
        }).state('spec', {
            url: '/speck/:specId',
            templateUrl: '/speck-templates/spec.html',
            controller: function($scope, $stateParams) {
                $scope.specid = $stateParams.specId;
            }
        }).state('spec.send', {
            url: '/send',
            templateUrl: '/spec-templates/send-spec.html',
            controller: function($scope, $stateParams) {
                $scope.specid = $stateParams.specId;
            }
        });
        jwtInterceptorProvider.tokenGetter = [
            function() {
                return 'mock-token';
                //return localStorage.getItem('id_token');
            }
        ];
        $httpProvider.interceptors.push('jwtInterceptor');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);