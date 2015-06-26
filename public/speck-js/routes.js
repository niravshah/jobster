'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('Speck').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, $locationProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('v2', {
            url: '/v2',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/v2-dash.html'
                }
            }
        }).state('v2.live', {
            url: '/live',
            'views': {
                'live': {
                    templateUrl: '/speck-templates/v2-dash-live.html'
                }
            }
        }).state('v2.dashboard', {
            url: '/dashboard',
            'views': {
                'dashboard': {
                    templateUrl: '/speck-templates/v2-dashboard.html'
                }
            }
        }).state('v2add', {
            url: '/v2/specify/:specId',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/v2-add.html',
                    controller: function($scope, $stateParams) {
                        $scope.specid = $stateParams.specId;
                    }
                }
            }
        }).state('v2add.desg', {
            url: '/desg',
            'views': {
                'subView': {
                    templateUrl: '/speck-templates/v2-add-desg.html'
                }
            }
        }).state('v2add.loc', {
            url: '/loc',
            'views': {
                'subView': {
                    templateUrl: '/speck-templates/v2-add-loc.html'
                }
            }
        }).state('v2add.spec', {
            url: '/spec',
            'views': {
                'subView': {
                    templateUrl: '/speck-templates/v2-add-spec.html'
                }
            }
        }).state('v2add.comments', {
            url: '/comments',
            'views': {
                'subView': {
                    templateUrl: '/speck-templates/v2-add-comments.html'
                }
            }
        });
        jwtInterceptorProvider.tokenGetter = [
            function() {
                if(localStorage.getItem('id_token') != null) {
                    return localStorage.getItem('id_token')
                } else return localStorage.getItem('guest_token')
            }
        ];
        $httpProvider.interceptors.push('jwtInterceptor');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('deep-orange');
    }
]);