'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('Speck').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, $locationProvider, $mdThemingProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('v2', {
            url: '/v2',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/v2-dash.html'
                }
            }
        }).state('v2add', {
            url: '/v2/add',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/v2-add.html'
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
        }).state('home', {
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
                'chat': {
                    templateUrl: '/speck-templates/chat.html'
                }
            }
        }).state('tables', {
            url: '/tables',
            templateUrl: '/speck-templates/tables.html'
        }).state('new-spec', {
            url: '/speck/new',
            'views': {
                'main': {
                    templateUrl: '/speck-templates/new-spec.html'
                },
                'sidebar': {
                    templateUrl: '/speck-templates/sidebar.html'
                },
                'header': {
                    templateUrl: '/speck-templates/header.html'
                }
            }
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
        $mdThemingProvider.theme('default').primaryPalette('brown').accentPalette('red');
    }
]);