angular.module('Speck', ['ui.router', 'ngCookies','ngStorage', 'angular-jwt', 'ngSanitize', 'ngMaterial', 'contenteditable','md.data.table','ngHello','dndLists']);
angular.module('Speck').directive('fabFloat', ['$mdMedia', FabFloat]);

function FabFloat($mdMedia) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            if($mdMedia('sm')) {
                element.addClass('fab-float-bottom');
            } else {
                element.addClass('fab-float-top');
            }
        }
    }
}
