'use strict';
/**
 * Route configuration for the specky-invite module.
 */
angular.module('specky-invite').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider', '$logProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, $locationProvider, $logProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('invite', {
            views: {
                'spec': {
                    templateUrl: '/invite-templates/invite.html',
                    controller: function($scope, $stateParams) {
                        $scope.code = $stateParams.code;
                    }
                },
                'sidebar': {
                    templateUrl: '/invite-templates/sidebar.html',
                    controller: function($scope, $stateParams) {
                        $scope.code = $stateParams.code;
                    }
                },
				'modal': {
                    templateUrl: '/invite-templates/modal.html',
                    controller: function($scope, $stateParams) {
                        $scope.code = $stateParams.code;
                    }
                },
				'chat':{
					templateUrl: '/invite-templates/chat.html',
					controller: function($scope, $stateParams) {
                        $scope.code = $stateParams.code;
                    }
				}
            },
            url: '/invite/:code',
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
        $logProvider.debugEnabled(false);
    }
]);