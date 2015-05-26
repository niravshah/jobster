'use strict';
/**
 * Route configuration for the specky-invite module.
 */
angular.module('specky-invite').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider,$locationProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('invite', {
            url: '/invite/:code',
            templateUrl: '/templates/invite/invite.html',
            controller: function($scope, $stateParams) {
                $scope.code = $stateParams.code;
            }
        });
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